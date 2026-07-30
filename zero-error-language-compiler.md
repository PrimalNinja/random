# The Zero Error Language Compiler

*A permissive compiler that never rejects input. Code that can't be executed is preserved as visible, tracked intent rather than thrown away — so a program always compiles and always runs, and the work of a project becomes turning stated intent into working code.*

---

## What it is

A Zero Error Compiler accepts anything you type, in any syntax, and always produces a running program. It does this by splitting every source file into two kinds of line:

- **Realized intent** — lines that parse and execute normally.
- **Pending intent** — lines the compiler can't turn into code, which it keeps verbatim, in place, as a visible marker rather than rejecting.

The result is that compilation never halts. There is no build-blocking error to fix before you can run and test. You write your program — including the parts you've only sketched in plain language — hit compile, and it runs whatever it can while flagging the rest as not-yet-built.

The development loop becomes: write pseudocode, compile, test, iterate, and gradually replace the pseudocode with real code as testing proves out what the program needs to do.

---

## The one rule that makes it safe: pending intent must be loud

The obvious way to "never error" is to silently turn anything invalid into a comment. **This is the trap the design must avoid.**

A silent demotion is dangerous precisely because a comment looks *intentional*. When someone reviews the file later, a swallowed line reads exactly like documentation the author chose to write. A bug — "I fat-fingered a brace and half my function stopped executing" — gets laundered into something that passes code review unnoticed.

So pending intent is never anonymous. It carries a marker that says *this was meant to be code and isn't running yet*, clearly distinct from ordinary prose. That single property — pending is always visibly pending — is what separates a usable system from a footgun. Everything else in the design depends on it.

### On the word "promotion"

It's tempting to describe demoting a line to a comment as "promotion," but taken literally that's backwards. In type systems, promotion (`int` → `double`) is *widening*: safe, lossless, more capability. Turning executable code into an inert comment is the opposite — a *narrowing* conversion, the kind that loses information and that compilers normally force you to request explicitly.

The honest framing is that the conversion isn't code → comment. It's **rejected-text → tracked pending requirement.** A line the compiler couldn't use is elevated from "input to be discarded" to "a first-class item on the project's to-do list, in the author's own words." That genuinely adds status, so the operation is worth marking and worth respecting — as long as it stays visible.

---

## "Never fails" vs. "never blocks"

It's easy to overstate the benefit. A Zero Error Compiler does **not** mean your program never fails — a program full of pending intent obviously doesn't do what you want yet. The failure isn't eliminated; it's moved from a loud compile-time error to a visible pending marker plus whatever your tests report.

The real, defensible benefit is that compilation never **blocks.** A normal compile error is a pipeline halt: one bad line turns the whole build red, the test runner never starts, and you get zero information about the hundreds of things that were fine. Removing that halt means the test harness always has something to run against, so feedback is available immediately and continuously.

This is the same instinct behind familiar tools: hot-reloading dev servers that serve the last good build, error-recovering parsers in IDEs that report many problems instead of stopping at the first, feature flags, and test runners that isolate a failing case so the rest of the suite still runs. *Don't let one broken thing starve everything else of feedback.*

---

## Intent programming

The mental model that ties the design together is to treat a source file not as "text to be validated" but as **a living document of intent** — part built, part still described in words.

Under this model, a test asks a different question than usual. Instead of "does the code do X?" it asks **"has this stated intent been turned into working behaviour yet?"** Every pending line is, by definition, an unmet requirement — so every pending marker doubles as an automatic failing test until something realizes it.

A project is "done" when every stated intent is either realized and passing its tests, or explicitly removed. Nothing pending is ever invisible.

---

## Keeping intent next to code: the stacking model

The cleanest way to preserve a pending line is to let it become the **header** of the block that will eventually fulfil it. The plain-language wish stays on top; the real code gets written directly underneath.

```
charge the customer the total plus tax
    var total = subtotal + (subtotal * taxRate);
    gateway.charge(customer, total);
```

- A header with nothing under it yet is **pending**.
- A header with working code under it is **realized**.

This arrangement earns its keep three ways:

- **The intent and the code sit side by side and can be read against each other.** "Does the code actually do what the sentence says?" becomes answerable by looking, because the two things being compared are finally in the same place instead of one living only in someone's head.
- **The wish becomes the specification, in place.** It's a docstring made of the exact, untranslated words of the person who asked for the feature — spec, documentation, and authorship record at once.
- **Progress is visible by scrolling.** Bare headers are the to-do list; filled ones are finished work; the author's own sentences read as the section titles of their own program.

---

## Knowing who wrote what: the smart editor

The language itself stays simple and permissive. A supporting editor supplies the intelligence, and its core job is just to tag every line two ways — both of which existing tooling already tracks:

- **Author** — who typed the line (this is line-level `git blame`).
- **State** — realized or pending (this is what the compiler already knows).

Cross those two and the file explains itself. A stakeholder's pending line is clearly a request, not behaviour. A developer's realized code sitting under a stakeholder's header shows a full chain of custody: who asked for it, who built it, and the exact gap between the request and the implementation.

The editor answers *who wrote it* and *does it run.* It does **not** answer *is the running code actually faithful to the request* — and that needs one more layer.

---

## Keeping code honest: three layers of verification

Each layer does one job well, and they compose:

1. **Structure.** Stacking the wish over its code makes the two *comparable* — a prerequisite for any check at all.
2. **Automated intent review.** A language model reads each request-and-code pair whenever it changes and judges, in plain language, whether the code fulfils the stated intent. It returns one of three verdicts: *matches* (built and faithful), *diverges* (runs, but does something other than the header claims — this catches silent drift), or *unclear* (the request is too vague to verify — which usefully flags requests that need sharpening before anyone can build or test them). This is a broad, continuous reviewer.
3. **Intent tests.** For the requirements that matter, ordinary tests bind the request to specific expected behaviour, so drift turns something red deterministically. This is the hard guarantee.

The automated review is a wide net; the tests are precise hooks. They catch different things — the reviewer flags drift nobody wrote a test for, while a test catches drift the reviewer might wave through — so both earn their place.

---

## Who benefits: contributors at every skill level

The design isn't fundamentally about skill; it's about separating **who states intent** from **who realizes it.** Those two roles can be assigned in whichever direction a task needs:

- **A non-technical stakeholder states intent; a developer or model realizes it.** The stakeholder types requirements straight into the shared file. Their input can't fail, so they never hit a syntax error or touch a terminal. Their contribution is real, visible, and honestly scoped: they wrote the *what*, and the authorship tags make clear the *how* came from someone else.
- **A junior scaffolds; a senior or model fills in the hard parts.** A less-experienced contributor can lay out structure and domain knowledge as pending intent from day one, without first clearing the tooling-and-syntax bar. They're productive immediately instead of being a net cost during ramp-up — and they learn by watching real code appear under their own requests.
- **A meticulous senior states intent; a model realizes it.** A senior who wants to keep architectural control writes the breakdown as precise pseudocode headers and lets a model fill in only the bounded, leaf-level bodies. The model is effectively a junior taking small, unambiguous tasks.

### Two strong use cases for the senior-driven direction

- **Large-project planning.** The decomposition *is* the file: modules and functions laid out top-down as stacked intent. The plan and the codebase are the same artifact from the start, and they can't quietly drift apart because the verification layer keeps each header honest about the code beneath it. This dissolves the usual problem of a design document that goes stale the moment coding begins.
- **Maintenance.** The original reason a piece of code exists stays welded to it as its header, in the original author's words. A note like *"retry three times because the payment gateway drops the first request after an idle period"* sits permanently above the retry loop. Anyone changing that loop sees why it's there, and the verification layer flags edits that no longer match. Maintenance stops being archaeology.

### Why this suits something like a video game

A game level is mostly declarative arrangement — spawn this enemy here, this door needs three keys, this boss enters phase two at half health — sitting on top of a small, reusable engine of genuinely hard logic (collision, state machines, pathfinding). That's a lopsided ratio, and the design splits it cleanly along the skill line. A junior scaffolds all the arrangement as pending intent; a senior builds the engine and handles only the requests that need real logic. Because most arrangement requests map to the same engine calls with different parameters, a model can fill in the bulk automatically — leaving the senior a to-do list of exactly the requests that need a human, either because they need a new capability or because they're cheap to ask for but expensive to build. As the engine grows across levels, more of the junior's requests land on capabilities that already exist, so the senior's effort per level drops over time.

---

## The day-one workflow

1. Write the product as pseudocode requests, top to bottom. Nothing blocks you; it all "compiles."
2. Stand up the test harness at the same time — it can start as pseudocode too. It runs immediately and honestly reports that almost nothing is built yet.
3. Firm up the harness as your *understanding* of the product firms up: vague checks become concrete assertions as you learn what "correct" means. The harness can get sharp before the code does.
4. Fill in the code underneath, request by request, each realization measured against a harness that's often already concrete for that piece.
5. Watch progress as a continuous shift from pending-and-failing to built-and-passing — no cliff, no build gate.

The useful inversion here: normally the test harness can't outrun the compiler, so you can't know what works until a skilled person has cleared every build-blocking error first. Here the harness and the code harden independently, and in the right order — the target gets sharp while the implementation is still soft. Skilled time stops being spent on ceremonial "make it build at all" work and goes entirely to real discrepancies.

A note on building the harness with the same compiler: test code is mostly flat *arrange / act / assert* — simple checks that tolerate a permissive compiler well and get the same pending/realized treatment as everything else, which keeps the whole workflow in one tool and one mental model. The exception is the harness's own complex scaffolding — mocks, fixtures, data generators — which is real logic and carries the same silent-demotion risk as product code. A half-built mock that yields a falsely-passing test is worse than an obviously failing one, so that scaffolding deserves the same scrutiny as the product.

---

## Relationship to agentic coding tools

This shares a core loop with agentic coding assistants: plain language in, code out, a model in the loop, iterate. The difference is the entry point. Agentic tools remove the *labor* of writing code for people who can already read and judge it — they still assume a terminal, a repository, real syntax, and a user who can evaluate a diff. Their floor is "a competent programmer delegating."

A Zero Error Compiler moves the barrier somewhere else: **the artifact itself tolerates contributors at any level.** A stakeholder types directly into the shared file and their input stays as a first-class item, with no terminal, no diff to read, and no error to fix. It removes the *prerequisites* of contributing, not just the labor, and keeps everyone working in one document.

The honest limit: this removes friction at the **input** boundary, not the **judgment** boundary. Someone still has to decide whether the built code is correct, and a non-technical contributor can't. What the design does is relocate that person's role honestly — they own the intent, and the verification layers carry the judgment they can't provide.

---

## Benefits

- **No pipeline halt.** One bad line never starves the rest of the project of feedback; the test harness always runs.
- **Intent is captured, not lost.** Input that can't compile becomes a tracked requirement instead of a rejection or a silent deletion.
- **Intent and code live together.** Stacking makes each request the header of its implementation — specification, documentation, and authorship in one place.
- **Drift is catchable.** Automated review reads intent against code continuously; intent tests pin the important requirements deterministically.
- **Real multi-skill collaboration.** Everyone contributes to one artifact at their own level, honestly credited — no faking, and no one locked out by tooling.
- **Newcomers are productive immediately** and learn by watching their requests get built.
- **Roles are flexible** — the same machinery serves scaffolding, requirements-gathering, senior-led planning, and maintenance.
- **Intent survives into maintenance,** attached to the code it produced, ending "why does this exist?" investigations.
- **Feedback from hour one,** with no time spent fixing build-blocking errors just to see any results at all.

## Risks and open questions

- **Silent demotion is the core hazard.** If a demoted line isn't clearly marked, a bug disguises itself as intentional prose and slips through review. The whole design depends on pending being unmistakably visible.
- **Safety now tracks test coverage.** A normal compile error is a free check that doesn't depend on anyone having written a test. Remove it, and the parts your tests don't cover go dark — and gaps don't turn tests red. Auto-generated failing tests from pending markers help, but only for lines that were demoted, not for logic holes inside code that does compile.
- **"Built" is not "correct."** A realized marker means the code runs, not that it matches the request. Faithfulness relies on the review layer and tests; without them, a file can quietly lie about itself.
- **Headers can drift from their code.** Editing the code beneath a request doesn't force the request to update, so a header can become a false description of what runs. A binding test or automated review is needed to keep them honest.
- **Automated review is a strong reviewer, not a proof.** It can bless code that subtly betrays the request, or flag a match that's actually fine. It belongs as the broad net, backed by deterministic tests where a guarantee is needed.
- **Complex test scaffolding** carries the same demotion risk as product code, and a falsely-passing test is more dangerous than a failing one.
- **Some judgment can't be made frictionless.** Requests that are cheap to state but expensive to build still need experienced cost judgment; the design surfaces them but can't remove the need for it.
- **Missing vs. broken can look identical.** In an API, a demoted route handler returns the same 404 as one that was never built. Telling those apart requires the demotion record to be machine-readable and consumed by the test layer.

---

## Implementation: start as a preprocessor

None of this requires writing a compiler from scratch. A first version can be a **preprocessor** that sits in front of an existing toolchain:

1. Read the source in units (lines or blocks).
2. Try to parse each unit with the real language's own parser.
3. If it parses, pass it through unchanged (realized).
4. If it doesn't, don't reject it — emit it as a clearly marked pending construct and record it in a machine-readable manifest (location, original text, reason) that the test harness and editor can read.
5. Hand the resulting always-valid source to the real compiler or interpreter, which now never sees anything it can't handle.

The same preprocessor produces the authorship and manifest data the editor and review layer consume. In other words, the "zero error compiler" is, at its simplest, an *error-recovering preprocessor plus an always-valid downstream build plus a record of everything that was set aside.*

---

## Applying it to three languages

How you keep a set-aside line both inert and visible depends on how each language handles comments and structure.

### ES5 (JavaScript)

- **Set-aside form:** wrap non-parsing text in a clearly marked block comment, e.g. `/* PENDING[line 42]: charge the customer the total plus tax */`.
- **Why it's the easiest starting point:** it's dynamic, interpreted, and forgiving. A preprocessor can use an existing JavaScript parser (such as Acorn or Esprima) to decide parse-or-fail per unit, and the language's hot-reload culture already matches the write-compile-test loop. The automated review step can even run in the browser.
- **Watch out:** JavaScript already hides bugs through its own leniency, so a set-aside marker must be visually distinct from ordinary comments or it vanishes into the noise. Reserve a dedicated marker prefix and enforce it.
- **Signal strength:** because the language is dynamic, "it's realized" is a relatively weak guarantee — parsing successfully says little about correctness.

### C

- **Set-aside form:** a marked comment for single lines, or `#if 0 ... #endif` guards for multi-line blocks so they're provably excluded from the build.
- **Natural fit:** C already ships with a preprocessor, so this pass is conceptually native — a stage before the compiler. Set-aside blocks can even be surfaced with a `#warning` directive so the real compiler itself prints them, giving loud, visible pending markers for free through the existing toolchain.
- **Watch out:** C is where silent demotion is most dangerous — there's no runtime safety net, and a quietly removed line inside tight control flow can change behaviour badly. Strongly prefer `#if 0` guards, which are provably not compiled, over bare comments. Note that the test scaffolding is itself real C and needs the same care.
- **Signal strength:** because C is statically compiled, "it's realized" is a strong signal — if it builds as C, it's genuinely structurally valid, making the pending/realized distinction unusually crisp.

### Go

- **Set-aside form:** a marked line comment, or a build-excluded file section (via build constraints) for larger blocks.
- **Natural fit:** Go's parser is part of its standard library, so the preprocessor can decide parse-or-fail with perfect fidelity and no third-party dependency, and its fast compiles suit a tight loop. A custom static-analysis check could even enforce that every pending marker eventually gets a real body, wiring the resolve loop directly into continuous integration.
- **Watch out:** Go is deliberately strict — unused imports and variables are hard errors — which fights the "type anything" spirit at the edges, because a half-finished body can trip Go's own non-negotiable checks. The preprocessor may need to stub pending regions more aggressively (generating placeholder bodies that satisfy the type checker) to keep the downstream build green. This makes Go the most work to keep never-erroring.
- **Signal strength:** for the same reason, "it's realized" carries the strongest guarantee of the three — a built Go program has cleared strict static checks.

### At a glance

| | ES5 | C | Go |
|---|---|---|---|
| Parser for the preprocessor | Acorn / Esprima (third-party) | C front end / `cpp` | standard library (`go/parser`) |
| Natural inert set-aside form | marked block comment | `#if 0` / `#warning` | build-excluded section |
| Loud pending via existing tools | console / build log | `#warning` prints it | custom analyzer |
| Strictness fighting "never error" | low (very forgiving) | medium (no safety net) | high (unused = error) |
| Strength of the "realized" signal | weak (dynamic) | strong (static) | strongest (static + strict) |
| Best suited to | rapid prototyping, in-browser | systems work, where proven-inert matters most | pipelines that enforce the resolve loop |

The through-line: **ES5 is the easiest to make never-error but gives the weakest assurance that a realized line is sound; Go is the hardest to keep never-erroring but gives the strongest such assurance; C sits between, and is where keeping set-aside code provably inert matters most because there's no runtime net.**