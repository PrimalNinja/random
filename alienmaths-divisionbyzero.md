# Alien Maths - Division by Zero

**Concept and system design:** Julian Cassin
**Date:** 2026-07-18
**Version:** Draft 1.0
**Status:** Draft for discussion
**Analysis, consistency checking, and drafting:** Claude Fable 5 (Anthropic)
**Requires:** Basic arithmetic. No calculus needed. No degree needed.

---

## 1. What This Is

Standard maths says you cannot divide by zero. The expression `1/0` is banned. Not "it equals something strange" — banned. The rulebook says the question itself is not allowed.

This document proposes a small extension: divide by zero is allowed, and the answer is a new value called **undefined**. Undefined is a real citizen of the number system, the same way zero and negative numbers are citizens — both of which were also banned once, and both of which were let in because they turned out to be useful.

We call the extended system **Alien Maths** because it is deliberately separate from standard maths. It does not replace anything. You opt in when it helps, the same way you opt in to using minus signs or fractions. If you never divide by zero, Alien Maths behaves exactly like the maths you already know.

**Baseline note:** the baseline for this document is standard arithmetic and algebra *without* limits. Limits and infinitesimals are both valid optional additions to any number system, including this one, but their methodologies are not covered in this draft.

---

## 2. The Core Idea in Plain English

We add **two** new values, not one:

| Symbol | Name | Nickname | Behaviour in one sentence |
|--------|------|----------|---------------------------|
| `⊥` | Consuming undefined | "the poison" | Anything it touches becomes `⊥`. |
| `⊥'` | Eliminating undefined | "the ghost" | It vanishes when it touches a real number. |

When you divide by zero, **you choose which one you get**, and you write your choice down. Writing `x/0` gives the poison. Writing `(x/0)'` gives the ghost. The little mark is your declaration, the same way a minus sign is a declaration.

That is the entire system. Everything below is consequences.

### The two behaviours, side by side

```
Poison:   5 + ⊥  = ⊥        (the error spreads and takes over)
Ghost:    5 + ⊥' = 5        (the error steps aside and the 5 survives)
```

Why two? Because in real life there are exactly two sensible things to do when something goes wrong:

1. **Stop everything and raise the alarm** (poison).
2. **Skip the broken bit and carry on** (ghost).

Standard maths offers neither. It offers only "you were not allowed to ask." Alien Maths offers both, and makes you say which one you mean.

---

## 3. The Rules (Complete Table)

For any real number `r` (including zero):

**Poison rules — `⊥` wins every fight:**

```
r + ⊥ = ⊥        r × ⊥ = ⊥        r − ⊥ = ⊥
r / ⊥ = ⊥        ⊥ / r = ⊥        ⊥ / 0 = ⊥
⊥ + ⊥ = ⊥        ⊥ + ⊥' = ⊥      (hard failure outranks soft)
```

**Ghost rules — `⊥'` loses every fight with a real number:**

```
r + ⊥' = r       r − ⊥' = r       ⊥' + ⊥' = ⊥'
r × ⊥' = ⊥'      (multiplication: the ghost behaves like zero here —
                  this is forced by the distributive law, see §7)
```

**Creation rule:**

```
x / 0  = ⊥       (unmarked division by zero gives poison — the safe default)
(x/0)' = ⊥'      (marked division by zero gives the ghost)
```

**The mark is a policy, not a reaction (important):**

You do not wait to see a zero before choosing the mark. The mark is attached to the *division site*, in advance, as a standing instruction: "**if** this denominator ever comes out zero, produce the ghost." On any real result the mark does nothing at all, because `r' = r` for every real number.

This matters most when the denominator is a compound expression whose parts are unknown:

```
( x / (y − z) )'
```

Here `y` and `z` may be variables, sensor readings, or results of other formulas — nobody knows whether they will collide into zero until the values actually arrive. You still write the expression today, mark your policy today, and the trigger fires (or never fires) at evaluation time. No pre-checking, no "first make sure y ≠ z." The policy is declared up front; the event is deferred. Unmarked sites carry the same standing instruction with poison as the outcome.

**Identity-protection rule (important):**

`⊥'` is *not* a second zero. Zero remains the one true additive identity of the real numbers. The ghost does not "leave things unchanged" — it *loses every collision* with real data, including with zero itself: `0 + ⊥' = 0`. This one-directional rule is what keeps `⊥'` and `0` as genuinely different values (see Guardrail G4).

**Telling them apart:**

Arithmetic alone cannot distinguish `⊥'` from `0` — that is on purpose. A *predicate* can:

```
is-undefined(0)  = no
is-undefined(⊥') = yes
is-undefined(⊥)  = yes
```

This is the same arrangement databases use: NULL adds like nothing, but `IS NULL` can still find it.

---

## 4. Why "Undefined Is a Value" Is Legitimate

The usual objection: "undefined means *no value*, so it cannot *be* a value."

The answer: in formal maths, a value is anything you name, put in the set, and give operation tables to. That is the whole entry requirement. We named it, we put it in the set `ℝ ∪ {⊥, ⊥'}`, and §3 is the operation table. It is a value by construction — exactly the argument that eventually admitted zero ("how can nothing be a number?") and negative numbers ("there is no such thing as negative three cows"). The semantic discomfort is real; the logical barrier is not.

---

## 5. Benefits

1. **Totality:** every expression now has an answer; no formula is ever illegal or crashes.
2. **No more mandatory small print:** "(except where x ≠ 0)" becomes optional documentation instead of a required guard on every fraction.
3. **You can work blind:** you can manipulate `a/b` before knowing whether `b` is zero; the answer sorts itself out when the values arrive.
4. **Lists keep their shape:** map a formula over a list containing a zero and the output list has the same length and order — position 4 in still matches position 4 out.
5. **The answer is its own alarm:** the result is `⊥` *if and only if* a division by zero happened somewhere. No separate error report needed.
6. **Zero and "broken" never get confused:** a sensor reading zero and a sensor that failed are different values. (Systems that define `x/0 = 0` lose this — the error launders itself into legitimate data.)
7. **Two error policies inside the arithmetic:** halt-everything (poison) and skip-and-continue (ghost), chosen per site, with no if/else logic bolted on outside.
8. **Averages come out right:** `average(5, ⊥') = 5` (one valid entry) but `average(5, 0) = 2.5` (two valid entries). Skipped and zero are counted differently, automatically.
9. **Equations grow useful branches:** an equation containing a division can be read in poison mode and ghost mode side by side, and the two readings give *different, complementary* facts (worked example in §8).
10. **All failures land in one place:** every division by zero, whatever the numerator, arrives at the same detectable value — one check catches everything.
11. **Fully backward compatible:** with no `⊥` present, every rule of ordinary arithmetic holds unchanged. You cannot break existing maths by ignoring the extension.
12. **Machines can check it:** every rule is mechanical. No step depends on a human reading English small print — which is the actual point of mathematical notation (see §10).

---

## 6. Cons

1. **Some classic identities become conditional:** `x − x = 0`, `x/x = 1`, `(a/b) × b = a`, and `0 × x = 0` hold for real numbers but not when `⊥` is in play.
2. **Poison destroys information:** once `5 + ⊥` collapses to `⊥`, the 5 is gone forever. No later operation can recover it.
3. **The ghost destroys the opposite information:** after `5 + ⊥' = 5`, downstream arithmetic cannot tell an error was ever skipped.
4. **Proofs need case-checking:** statements must be checked for "what if this term is ⊥?" alongside the normal case.
5. **You must declare the mode:** every division by zero site silently gets poison unless marked; forgetting the mark picks a policy for you.
6. **Ordering and comparison break at ⊥:** `⊥ < 5` has no meaning; anything relying on ordering must stay in the real fragment.
7. **Equations gain extra solutions:** `x + 1 = x` has no real solution, but `x = ⊥` satisfies it (since `⊥ + 1 = ⊥`).
8. **New readers need the table:** results only mean something to people who know the rules of §3.
9. **Edge interactions must all be written down:** `−⊥'`, `⊥/⊥`, `⊥' as a denominator` — each needs an explicit rule or it is undefined all over again.
10. **Exact-zero is a knife edge in decimal computing:** `s = 0.000000001` is not zero, so the poison never triggers; floating-point use needs care.

---

## 7. Guardrails (One Per Con)

- **G1 — Guarded identities (for Con 1):** every classical law is kept, restated with a guard: "for all *real* x: x − x = 0." The guard is automatically satisfied whenever no `⊥` is present — which is all of ordinary maths. Nothing is lost; the laws just state their jurisdiction.
- **G2 — Escalate to pairs when you need both halves (for Cons 2 & 3):** if one calculation needs the answer *and* the fact that an error occurred, carry the pair `(value, error-flag)` for that calculation only. The poison and the ghost are the two halves of this pair; use the whole pair when you genuinely need both. Note: Cons 2 and 3 are also *the point* — each mode deliberately discards the half you said you did not need.
- **G3 — One transfer lemma (for Con 4):** prove once, as a single reusable theorem: *any identity true in ordinary arithmetic remains true in Alien Maths whenever all sub-terms evaluate to real numbers.* After that, no theorem needs individual re-checking — cite the lemma. (Precedent: this is exactly how infinitesimal systems earned their keep.)
- **G4 — Poison is the default, and the two values stay distinct (for Con 5):** unmarked division by zero always means poison. One global convention, stated once, matching how computing hardware already treats invalid results. And the mode lives in the *value* (`⊥` vs `⊥'` are different elements), not in a removable annotation — this keeps "replace equals with equals" fully legal everywhere, because two things that behave differently are never declared equal.
- **G5 — Solve over the reals unless stated (for Cons 6 & 7):** equations are solved in the real fragment by default; `⊥`-solutions are reported only if asked for. Identical to the existing convention "solve over the reals" that already excludes complex answers. A `⊥`-solution is not garbage, though — `x = ⊥` solving `x + 1 = x` correctly reports "this holds only in the broken state," which is information.
- **G6 — The table is the preamble (for Con 8):** one page (§3) is the entire onboarding cost. Every formalism from matrices to fractions carries the same cost.
- **G7 — Close the table (for Con 9):** the remaining entries are finite — roughly six. Write them once (suggested: `−⊥' = ⊥'`, `⊥/⊥ = ⊥`, `r/⊥' = ⊥`, i.e. using a ghost as a denominator is a hard error) and the system is closed. Where a genuine design choice exists (should `⊥'/0` stay a ghost or escalate to poison?), pick per use-case and declare — that freedom is a feature.
- **G8 — Declare a zero-snap for decimal computing (for Con 10):** when using floating point, state a threshold below which values snap to exact zero, as part of the mask's fence. Or use integers or exact arithmetic, where zero is zero.

The general principle behind all eight: **a guardrail is not damage control on a broken system — the fence is part of the definition.** Infinitesimals were used productively for two centuries under informal fences before anyone proved the fences sufficient. Limits themselves come with a fence-list every student memorises (when you may and may not swap them, rearrange series, and so on). A mathematical tool *is* a consistent fragment plus a fence plus a declared purpose. This one has all three written down.

---

## 8. Worked Examples in Baby English

### 8.1 The list that keeps its shape

Divide 10 by each number in the list `{5, 4, 2, 0, 1}`:

```
Standard maths:  {2, 2.5, 5, ✗ ILLEGAL — stop, filter, apologise, re-run}
Alien maths:     {2, 2.5, 5, ⊥, 10}
```

Five in, five out. Position 4 still lines up with position 4. If this were a spreadsheet column, the rows still match. The `⊥` marks exactly where the bad input was — the error report is *in* the answer.

### 8.2 The alarm that builds itself (poison)

Add up a whole column of divisions:

```
10/5 + 10/2 + 10/0 + 10/1  =  2 + 5 + ⊥ + 10  =  ⊥
```

One bad entry poisons the total. So the total is its own test: **real number = every entry was fine; `⊥` = something was broken.** One check at the end instead of a guard on every line.

### 8.3 The skip that counts correctly (ghost)

Same column, ghost mode:

```
10/5 + 10/2 + (10/0)' + 10/1  =  2 + 5 + ⊥' + 10  =  17
```

The broken entry steps aside; the good data survives. And because the ghost is *not* zero:

```
average(2, 5, ⊥', 10) = 17 ÷ 3 = 5.67    (three valid entries)
average(2, 5, 0,  10) = 17 ÷ 4 = 4.25    (four valid entries — that zero was real data)
```

A skipped entry and a genuine zero divide by different counts. Systems that turn errors into zero get this wrong forever.

### 8.4 The zero nobody saw coming (deferred trigger)

Write a formula whose denominator is built from parts:

```
( x / (y − z) )'
```

Today, `y` and `z` are unknowns — maybe two sensor readings, maybe two results from elsewhere in the pipeline. You cannot know whether they will ever be equal. Standard maths demands the disclaimer *now*: "valid provided y ≠ z," carried through every later step as small print.

Alien Maths lets you mark the policy now and settle the event later:

```
y = 7, z = 3:   x / 4        (ordinary answer — the mark did nothing)
y = 7, z = 7:   ⊥'           (the parts collided into zero — ghost, as declared)
```

The decision was never "wait until we see the zero, then pick a mode." The mode was chosen when the formula was *written*; the zero merely triggers it, or never does. This is what lets you build long chains of formulas over unknown values without a single guard clause anywhere in the chain.

### 8.5 The built-in spare tyre (fallback)

Add a constant after a ghost-marked division and you get a default value for free:

```
f(y) = (x/y)' + c

y ≠ 0:   x/y + c     (normal answer)
y = 0:   ⊥' + c = c  (the fallback c takes over — no if-statement anywhere)
```

The `+ c` *is* the error handler, fused into the formula. And two divisions can cover each other's holes: `x/y` breaks only at `y = 0`, while `x/(y+1)` breaks only at `y = −1`, so their ghost-marked sum always has at least one term alive — each formula is the other's spare tyre. **One honest warning:** the fallback `c` is an ordinary number, so downstream you cannot tell "fallback fired" from "the maths honestly produced c." If you need to *know* the fallback fired, run the poison twin alongside as the detector (§8.2), or pick a `c` the formula could never produce naturally.

### 8.6 Two readings of one equation (branching)

Take `a + e/f = c + d`, and suppose `f` turns out to be zero.

**Ghost reading:** `a + ⊥' = c + d`, so `a = c + d`. A genuine constraint on `a` — impossibilities eliminated.

**Poison reading:** `⊥ = c + d`. This can only hold if the right side *also* contains a division that hit zero. If `c` and `d` are known ordinary numbers, this branch is impossible — which is *also* a fact you have learned.

Two readings, side by side, each yielding a different true statement — the same side-by-side technique school teachers use at the whiteboard, but now the branch lives inside the arithmetic instead of in the margin notes.

### 8.7 The mask made of arithmetic

Want to keep list entries only where a control `c` is non-zero? Multiply each entry by the gate `(c/c)'`:

```
c ≠ 0:   d × (c/c)' = d × 1  = d      (passes through)
c = 0:   d × (c/c)' = d × ⊥' = ⊥'    (vanishes on contact)
```

One expression per entry. No filter step, no separate yes/no list, no "where clause" written in English. Chaining conditions is just multiplying gates: `d × (a/a)' × (b/b)'` keeps `d` only where **both** `a` and `b` are non-zero — an AND written as a product.

### 8.8 The fader with a real off-switch

Scale data by a control `s`, and make `s = 0` mean *dead*, not merely *quiet*:

```
d × s × (s/s)
```

For any non-zero `s` this is ordinary smooth scaling, `d × s`. At exactly `s = 0` it becomes `⊥` — consumed. Now three situations that plain multiplication smears into one are held apart: **quiet** (small `s`), **measured silence** (`d = 0`, `s` live), and **channel off** (`s = 0`, poison). Mixing desks build a separate mute button precisely because ordinary arithmetic cannot say this. Here it is said in one term. Swap in the ghost instead of the poison and the same formula changes from a safety interlock (one dead channel kills the whole mix — a dead-man's switch) into a graceful mixer (dead channels drop out, the rest carry on).

### 8.9 The building that proves itself

Two little facts about pipes, provable with school arithmetic:

- A **round pipe of diameter 20** fits a **square duct of 20 × 20**: the requirement is diameter ≤ side, and the clearance is `20 − 20 = 0`. It fits (exactly — touching).
- A **square pipe of 20 × 20** does **not** fit a **round opening of diameter 20**: the square's corner-to-corner diagonal is `20 × √2 ≈ 28.28`, so the clearance is `20 − 28.28`, which is negative. No rotation helps — the diagonal is the smallest circle the square can hide inside.

Now turn every such fit-check in an entire building into a gate. For each constraint, let the clearance be `c = provided − required`, declare a tolerance `t` (how much clearance counts as clearance), and gate it:

```
m = max(c − t, 0)          (ordinary arithmetic: max(a,0) = (a + |a|) ÷ 2)
gate = m/m                 (clearance OK → 1;  clearance failed → ⊥)
```

Then the whole design is **one product**:

```
Feasible = gate₁ × gate₂ × gate₃ × … × gateₙ
```

— one factor per pipe-through-penetration, beam-against-void, door-against-corridor, anything with a "must fit" in it. The answer means exactly two things: **a real number** — every clearance in the building passes; **`⊥`** — somewhere, someone designed a square pipe into a round hole, and the poison carried that fact to the top through pure arithmetic. No inspection pass. No checklist meeting. Evaluation *is* the proof. Re-run the same product with ghost marks and the `⊥'` entries are a map of *exactly which* constraints failed, positions preserved (§8.1) — the alarm and the fault-locator are the same formula in its two modes.

Two honest notes. First, the formula proves the *listed* constraints are satisfied — it cannot vouch for a constraint nobody wrote down. What changes is where omissions can hide: instead of living invisibly in prose across drawings and emails ("coordinate on site"), every assumption must exist as a factor to participate at all, so "did anyone check the duct against the void?" becomes "is there a factor for it?" — a question with a mechanical answer. Second, the tolerance `t` is *mandatory syntax*: you cannot even write the gate without declaring how much clearance is enough — turning Con 10's knife-edge into a virtue, because good engineering demanded a stated tolerance anyway and prose routinely forgot it.

And nothing here was really about geometry. "Clearance" is just `provided − required`, and that shape is everywhere: rated temperature minus operating temperature, breaker rating minus load, structural capacity minus demand, budget minus cost, legal limit minus emission. Every one compiles to the same gate, so thermal factors, electrical factors, and money factors all sit in the *same product* as the pipes — after gating, they are all just factors.

### 8.10 The simulation that skips its own dead ends

Here is a bonus the poison gives you for free: **permission to stop calculating.**

In ordinary arithmetic, to compute `a × b` you must work out both sides. But `anything × ⊥ = ⊥` and `anything + ⊥ = ⊥` — so the instant any part of an expression turns to poison, the final answer is already decided, and a rule of the algebra (not a programmer's shortcut) says the rest of the work may be skipped. Skipping is not an approximation; it provably gives the same answer as grinding through everything.

Now run §8.9's product inside a simulation testing ten thousand candidate designs. Because multiplication does not care about order, sort the gates by cost: the microsecond checks first (does the pipe fit, is the budget positive), the hour-long physics last (stress models, heat-flow models). A candidate that fails a cheap gate dies at `⊥` in the first factors — and the algebra certifies that the expensive physics *never needed to run for it*. Only survivors reach the heavy machinery. The armies of if-statements that normally stand guard around a simulation collapse into factors of the very formula being simulated; pruning is just evaluation order, and evaluation order is free.

Note the tidy asymmetry: **the poison short-circuits, the ghost cannot** — `5 + ⊥'` still needs the 5, so ghost mode must evaluate everything. The mark you chose for meaning turns out to also schedule the work: `⊥` sites are stop-early points, `⊥'` sites are keep-working points. One symbol, two duties, declared once. So the same absorbing value now serves three jobs — the alarm (§8.2), the interlock (§8.8), and the pruner — all because absorbing a value destroys the *need* for information in the same stroke it destroys the information.

---

## 9. One Proof, Because One Is Owed

**Claim:** no operation applied *after* a poisoning can recover what was poisoned. (This is why the mode must be chosen *before* evaluation, and why `⊥` and `⊥'` must be different values rather than one value with a removable mark.)

**Proof:** `5 + ⊥ = ⊥` and `7 + ⊥ = ⊥`. Both results are the *same value*. A function gives one output per input; any function `f` applied to that shared value gives one answer — `f(⊥)` — which therefore cannot be 5 for the first history and 7 for the second. The 5 was destroyed at the moment of consumption; values have no memory of how they were made. ∎

This is not a defect — it is the same theorem that forbids ordinary division by zero in the first place: `5 × 0 = 0` and `7 × 0 = 0`, so no function of that shared `0` can recover the 5 or the 7 — and *that* impossible function is exactly what `x/0` would have to be. Absorbing values destroy information; the corresponding "undo" can never exist. Alien Maths does not escape this law; it *relocates* the information loss to a declared, chosen place — and lets you choose *which* information to lose (the data, via poison, or the error, via ghost).

---

## 10. Why Bother — The Real Argument

Everything above is already achievable *somehow*: with filters, if-statements, side conditions, footnotes, and careful paragraphs of English stitched between the formulas. That stitching is the problem. "Provided y is not zero…" is small print carried by the reader, checkable by no rule.

Mathematical notation exists to delete exactly that kind of small print. Equations replaced paragraph-algebra; the summation sign replaced "add up all terms of this kind." Each time, nothing new became *possible* — something became *checkable*. Alien Maths applies the same upgrade to the oldest piece of small print in arithmetic: the division-by-zero disclaimer becomes two symbols and a table, and the disclaimer's job is done by the algebra itself.

Whether it can fully coexist inside standard maths is a separate, open question. If it cannot, it lives happily as an opt-in alien system — the way "non-standard analysis" has worn the alien label for sixty years while working fine. If it proves useful enough for long enough, it may stop being alien, the way zero did, and the way negative numbers did. Use is the only judge mathematics has ever actually had.

---

## Appendix: The System on One Card

```
SET:        ℝ ∪ {⊥, ⊥'}

CREATE:     x/0 = ⊥          (unmarked: poison — the default)
            (x/0)' = ⊥'      (marked: ghost)

POISON:     absorbs everything, every operation.  ⊥ + ⊥' = ⊥.
GHOST:      absorbed by every real under + and −; acts like zero under ×;
            is NOT zero — predicates tell them apart; using it as a
            denominator is a hard error (→ ⊥).

DEFAULTS:   unmarked = poison.  Solve equations over ℝ unless ⊥ requested.
LAWS:       every classical identity holds, guarded: "for all REAL x…"
LOSS:       poison keeps the error, loses the data.
            ghost keeps the data, loses the error.
            Need both? Carry the pair (value, flag) for that calculation.
SPEED:      poison short-circuits (once seen, skip the rest — provably safe);
            ghost never does (it needs the survivors).
```

*Opt in when it helps. Ignore it and nothing changes.*