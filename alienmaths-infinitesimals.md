# Alien Maths - The Infinitesimal Framework of Numbers: A Practical Notation for the Continuum

**Author:** Julian Cassin  
**Date:** 2026-07-19  
**Version:** 1.1 — as-built specification, aligned with the reference implementations `infinitesimal.js` (core class + 20-test harness) and `jneuralnetwork.js` (a learning framework with an infinitesimal-weighted core and a pluggable similarity slot)  
**Revision notes:** Claude Fable 5 (Anthropic) — arithmetic tables corrected to match implemented behaviour; open "?" rows resolved from code; certified core identified

---

## Executive Summary

This whitepaper introduces a novel notation system for representing numbers with infinitesimal and infinite components using simple ASCII characters. The system, based on the `...n` and `.-.n` notation, provides an intuitive, programmable, and mathematically rigorous way to work with the continuum—from the smallest infinitesimals to the largest infinities.

Unlike traditional notations that treat infinitesimals (ε, dx) and infinities (∞) as special symbols, this framework integrates them directly into the number line, creating a unified representation where every number exists as a **neighborhood** rather than a point.

---

## 1. The Problem: Discrete Representation of a Continuous Reality

Current mathematical notation suffers from several limitations when dealing with the continuum:

| Problem | Example | Consequence |
|---------|---------|-------------|
| **Infinitesimals are special** | ε, dx, ①⁻¹ | Treated as separate from ordinary numbers |
| **Infinity is singular** | ∞ | No distinction between different magnitudes of infinity |
| **Directional ambiguity** | lim(x→a⁺) vs lim(x→a⁻) | Requires separate notation for approach direction |
| **No hierarchy** | No way to distinguish ε from ε² | Lost information about relative magnitude |
| **Not programmable** | ∞ cannot be used in code | Mathematical concepts inaccessible to computing |

The Infinitesimal Framework solves all of these problems with a single, elegant notation.

---

## 2. The Notation: Dots as Magnitude

### 2.1 Core Symbols

| Symbol | Meaning |
|--------|--------|
| **...n** | A positive infinitesimal/infinite of magnitude n, where n ∈ {1,...,9} |
| **.-.n** | A negative infinitesimal/infinite of magnitude n |
| **++...n** | Increment by a positive infinitesimal/infinite of magnitude n |
| **--...n** | Decrement by a positive infinitesimal/infinite of magnitude n |

### 2.2 The Magnitude Hierarchy

The number n indicates relative magnitude on a logarithmic-like scale:

| n | Meaning in Infinitesimal Range | Meaning in Infinite Range |
|---|-------------------------------|---------------------------|
| **1** | Smallest infinitesimal (ε¹) | Smallest infinity (ω¹) |
| **2** | Next infinitesimal (ε²) | Next infinity (ω²) |
| **3** | Third order | Third order |
| **4** | Fourth order | Fourth order |
| **5** | Fifth order | Fifth order |
| **6** | Sixth order | Sixth order |
| **7** | Seventh order | Seventh order |
| **8** | Eighth order | Eighth order |
| **9** | Largest infinitesimal before human scale? | Largest infinity (ω⁹) |

### 2.3 The Fundamental Increment Rule

```
x ++...n = x...n
x --...n = x.-.n
```

Where `x...n` means "x plus an infinitesimal/infinite of magnitude n" and `x.-.n` means "x minus an infinitesimal/infinite of magnitude n".

### 2.4 The As-Built Model (What the Reference Implementation Actually Does)

The reference implementation (`infinitesimal.js`) stores every number as three parts:

| Part | Storage | Meaning |
|------|---------|---------|
| **Base** | a float | the ordinary-number part |
| **Offset** | −1, 0, or +1 | exact / infinitesimally above / infinitesimally below |
| **Magnitude** | a string | first character = **elevation** (a digit 1–9), remaining characters = **nudges** (counted by length) |

Three implemented rules were discovered to be load-bearing and are now part of the specification:

**The ULP-Carry Rule.** When elevation arithmetic exceeds 9, the implementation adds **one unit in the last printed decimal place of the base** and subtracts 10 from the elevation. For an integer base, that means `+1`; for a base like `2.5`, it means `+0.1`. Consequence: **elevation is literally a digit sitting one decimal place below the base's displayed precision.** Ten elevation units equal one unit-in-the-last-place (ULP) of the base as written. This makes the as-built infinitesimals *relative* infinitesimals — infinitesimal relative to the precision at which the base is expressed — rather than the absolute infinitesimals of nonstandard analysis. Both readings are legitimate; the document previously described the absolute reading, the code implements the relative one, and the relative one is what every test result reflects.

**The Promotion Rule.** If elevations cancel to exactly 0 during addition but nudges survive the collision, the result keeps offset direction, resets elevation to 1, and preserves the surviving nudges. A nudge residue is never silently discarded — it is promoted onto the smallest elevation carrier.

**The Sign Rule.** Negating a number negates both base and offset while keeping the magnitude string: the additive inverse of `5...2` is `-5.-.2`. Subtraction is implemented as addition of the negation.

One known asymmetry, documented as a limitation: `nudgePositive()` and `nudgeNegative()` both append to the nudge string when offset is already non-zero; direction is carried by the offset only when nudging starts from an exact number. Directional nudges on an already-offset value are future work (§11).

---

## 3. The Number Line as Neighborhoods

### 3.1 Positive Numbers

| Notation | Meaning |
|----------|---------|
| **1** | Exactly one |
| **1...1** | One-ish, but a tiny bit more |
| **1...2** | One-ish, but a bit more |
| **1...3** | One-ish, but increasingly more |
| **...** | ... |
| **1...9** | One-ish, but infinitely more |
| **1.-.1** | One-ish, but a tiny bit less |
| **1.-.2** | One-ish, but a bit less |
| **1.-.3** | One-ish, but increasingly less |
| **...** | ... |
| **1.-.9** | One-ish, but infinitely less |

### 3.2 Negative Numbers

| Notation | Meaning |
|----------|---------|
| **-1** | Exactly negative one |
| **-1...1** | Negative one-ish, but a tiny bit more (closer to zero) |
| **-1...2** | Negative one-ish, but a bit more |
| **-1...3** | Negative one-ish, but increasingly more |
| **...** | ... |
| **-1...9** | Negative one-ish, but infinitely more (approaches zero from below) |
| **-1.-.1** | Negative one-ish, but a tiny bit less (more negative) |
| **-1.-.2** | Negative one-ish, but a bit less |
| **-1.-.3** | Negative one-ish, but increasingly less |
| **...** | ... |
| **-1.-.9** | Negative one-ish, but infinitely less (approaches negative infinity) |

### 3.3 Zero

Zero has its own symmetric neighborhood:

| Notation | Meaning |
|----------|---------|
| **0** | Exactly zero |
| **0...1** | Infinitesimally positive |
| **0...2** | Slightly more positive |
| **...** | ... |
| **0...9** | Approaching positive infinity from zero? (infinite positive) |
| **0.-.1** | Infinitesimally negative |
| **0.-.2** | Slightly more negative |
| **...** | ... |
| **0.-.9** | Approaching negative infinity from zero |

---

## 4. Visualizing the Spectrum

```
-∞                     -1                      0                      1                      ∞
 |----------------------|----------------------|----------------------|----------------------|
 
-1.-.9  -1.-.2 -1.-.1  -1  -1...1 -1...2 -1...9  0   1.-.9 1.-.2 1.-.1  1  1...1 1...2 1...9
```

Every point on this line is actually a **neighborhood**—a cluster of numbers distinguished by their infinitesimal/infinite offsets.

---

## 5. Arithmetic Operations (As Implemented)

All rules below are the implemented behaviour of `infinitesimal.js`, verified against the test harness. Earlier drafts of this document proposed different rules for multiplication; the code is now authoritative.

### 5.1 Addition — elevations add (with sign), nudges concatenate or cancel

Bases add as ordinary numbers. Elevations add as signed quantities (offset supplies the sign). Same-direction nudges concatenate (counts add); opposite-direction nudges cancel by count, the longer side surviving.

| Operation | Result | Rule |
|-----------|--------|------|
| `1 ++...1` | `1...1` | Increment by smallest |
| `1 ++...2` | `1...2` | Increment by next |
| `1...1 ++...1` | `1...2` | Elevations add: 1+1 = 2 |
| `1...1 + 1...1` | `2...2` | Bases add, elevations add |
| `1...1 + 1...2` | `2...3` | Bases add, elevations add |
| `1...8 ++...1` | `1...9` | Reaching the largest elevation |
| `1...9 ++...1` | `2` | **ULP carry:** elevation 10 → base +1 ULP, elevation 0, result exact |

The last row resolves the former "?": under the ULP-Carry Rule, ten first-order steps complete one unit in the base's last decimal place, landing on an exact number — the infinitesimal ladder actually reaches the next rung, because the as-built infinitesimals are precision-relative (§2.4).

### 5.2 Subtraction — negate and add

Negation flips base and offset, keeps magnitude (§2.4 Sign Rule). Then the addition rules apply.

| Operation | Result | Rule |
|-----------|--------|------|
| `1 --...1` | `1.-.1` | Decrement by smallest |
| `2 - 1...1` | `1.-.1` | (2) + (−1.-.1): bases give 1, offset −1 survives |
| `1...2 - 1...1` | `0...1` | Bases cancel, elevations +2 −1 = +1 |
| `1.-.1 --...1` | `1.-.2` | Negative elevations compound |
| `1.-.8 --...1` | `1.-.9` | Reaching the largest negative offset |
| `1.-.9 --...1` | `0` | **ULP carry downward:** elevation −10 → base −1 ULP, result exact |

The last row resolves the former "?" the same way: ten downward steps complete one downward ULP.

### 5.3 Multiplication — bases multiply, elevations multiply (tally semantics)

Bases multiply as ordinary numbers. Elevations **multiply** (as-built rule — earlier drafts proposed addition). Nudges concatenate. Offsets follow the sign rule (same → +, different → −). Elevation products above 9 cascade through the ULP-Carry Rule, one ULP per 10.

| Operation | Result | Rule |
|-----------|--------|------|
| `...1 × ...1` | `...1` | 1 × 1 = 1 |
| `...1 × ...2` | `...2` | 1 × 2 = 2 |
| `1...1 × 1...1` | `1...1` | Bases 1×1, elevations 1×1 |
| `...3 × ...3` | `...9` | 3 × 3 = 9, at the carry boundary |
| `...9 × ...9` | `8...1` | 9 × 9 = 81 → eight ULP carries + elevation 1 |

**Honest note — an open design point, not a bug.** Elevation-multiplication is an *undetermined choice*, and the shipped rule is one valid option among several, kept because it ships, tests green, and no application yet multiplies magnitudes against each other (§9's apps only tally and compare — so nothing currently exercises this rule at all). Three coherent readings exist, and none is "correct" until a consumer picks one:

- **Tally / order-descent (shipped):** multiplying magnitudes drives toward a definite combined magnitude. Reads naturally as "make this infinitesimally smaller/larger by a factor" — a valid operation on its own terms.
- **Measure (Levi-Civita style):** two sub-ULP quantities multiply to something *below* either — orders would *add* (ε¹ × ε¹ = ε²), not multiply. This is what full distribution forces (see below) and what derivatives would want.
- **Fully symmetric / distributive:** treat the value as a genuine two-part number `(base + ε)` and distribute: `(a+ε₁)(b+ε₂) = ab + a·ε₂ + b·ε₁ + ε₁·ε₂`. This restores the **base×infinitesimal cross-terms** the shipped rule drops (a big base should scale the other's infinitesimal), and forces orders to *add* for the second-order term. It is *determined* rather than chosen — distribution leaves no free parameter — but it generates terms at multiple orders, so it requires the multi-tier coefficient representation (a coefficient per order) rather than the single elevation digit, which is why it is future work (§11).

The author's intended long-term direction is the distributive reading (symmetric, cross-terms restored). For now the shipped tally rule stays, because both are valid, there is no consuming application to supply the deciding criterion, and "make something infinitesimally smaller" is a legitimate operation the current rule already serves. This is a genuine open slot — possibly best made *pluggable per use*, like the similarity callback and the division-mode mark — not a defect to fix.

### 5.4 Division — bases divide, elevations floor-divide, nudges cancel by count

Bases divide as ordinary numbers. Elevations floor-divide. Nudge counts subtract; if the divisor carries more nudges than the dividend, the offset flips (dividing by something slightly bigger pulls the result slightly below).

| Operation | Result | Rule |
|-----------|--------|------|
| `2 / 1` | `2` | Ordinary division untouched |
| `1 / 1...1` | `1.-.1` | Dividing by slightly-more gives slightly-less — correct to first order, since 1/(1+ε) ≈ 1−ε |
| `1...2 / 1...1` | `1...2` | Bases 1/1, elevations ⌊2/1⌋ = 2 |
| `...1 ÷ ...9` | *(base 0/0 — see below)* | Pure-infinitesimal ÷ pure-infinitesimal |
| `...9 ÷ ...1` | *(base 0/0 — see below)* | Pure-infinitesimal ÷ pure-infinitesimal |

**The 0/0 boundary — a live bridge to the division-by-zero framework.** A pure infinitesimal has base 0. Dividing one pure infinitesimal by another therefore computes `0/0` in the base tier, which the current implementation inherits from JavaScript as `NaN` — an unprincipled poison with none of the declared behaviour of `⊥`. This is precisely the seam where the two Alien Maths documents meet: the base tier of this framework should adopt `⊥`/`⊥'` from *Alien Maths — Division by Zero*, making `...n ÷ ...m` evaluate to a declared sentinel in the base with a still-meaningful magnitude tier, instead of a platform accident. Formalising that junction is future work (§11), and it is the concrete instance of the general principle: **infinitesimals govern the approach to zero; `⊥` governs the point itself.**

---

## 6. Applications in Calculus

### 6.1 Derivatives

The derivative can be expressed naturally:

```
f'(x) = (f(x ++...1) - f(x)) ÷ ...1
```

No limits required—the infinitesimal is explicit.

**Completeness note (as-built):** this formula is the same mechanism as forward-mode automatic differentiation with dual numbers — long-deployed engineering, which is evidence the approach is workable. Two ingredients are still owed by this framework before §6.1 is fully operational: the `0/0`-in-the-base issue from §5.4 (the difference and the divisor are both pure infinitesimals), and a **standard-part operation** `st()` that reads off the base and discards the residual magnitude, so that the derivative of x² at 3 reports `6` rather than `6...n`. `st()` is the framework's own declared information-discard — the same conservation-law move as the ghost `⊥'` in the companion document: keep the answer, drop the bookkeeping, on purpose and in writing. Both items are listed in §11.

### 6.2 Integrals

```
∫ f(x) dx = ∑ f(x) × ...1  over [a,b]
```

The integral is literally a sum of infinitesimal slices.

### 6.3 Limits

Directional limits become explicit:

| Limit | Notation |
|-------|----------|
| Right-hand limit | `lim(x → a +...1) f(x)` |
| Left-hand limit | `lim(x → a -...1) f(x)` |
| Two-sided limit | `lim(x → a) f(x)` (exists if both match) |

---

## 7. Applications in Programming

This section reflects the shipped reference implementation `infinitesimal.js` (ES5, runs in CyborgShell). It follows the project conventions: `m_` members, `_a` arguments, Hungarian datatype prefixes, single exit points, no ES6.

### 7.1 The Infinitesimal Data Type

The class stores three fields and exposes value-style methods (each returns a **new** Infinitesimal; instances are treated as immutable by convention):

```javascript
function Infinitesimal(args_a)
{
    var m_objBase = null;      // the ordinary-number part
    var m_intOffset = 0;       // -1 (below), 0 (exact), +1 (above)
    var m_strMagnitude = '';   // char[0] = elevation (1-9); rest = nudges (by length)

    // Construct from number, from string ("1...2", "5.-.1"),
    // from another Infinitesimal, or from {base, offset, magnitude}.
    // ... getters/setters, clone, toString ...
}
```

Display collapses long nudge strings to a bracketed count: internal magnitude `"2111"` prints as `2[3]` (elevation 2, three nudges). Construction accepts the human notation directly: `new Infinitesimal('1...2')`, `new Infinitesimal('5.-.1')`, `new Infinitesimal(3)`.

### 7.2 The Operators (as shipped)

| Call | Effect | Example |
|------|--------|---------|
| `.add(o)` / `.subtract(o)` | §5.1 / §5.2 arithmetic | `a.add(b)` |
| `.multiply(o)` / `.divide(o)` | §5.3 / §5.4 arithmetic | `a.multiply(b)` |
| `.nudgePositive()` | append one nudge toward positive | `1...1` → `1...1[1]` |
| `.nudgeNegative()` | append one nudge toward negative | (from exact) sets offset −1 |
| `.nudgeBack()` | remove one nudge | `1...1[2]` → `1...1[1]` |
| `.elevateUp()` / `.elevateDown()` | change elevation digit; overflow at 9 carries a base ULP | `1...1` → `1...2` |
| `.compare(o)` / `.lessThan(o)` / `.greaterThan(o)` / `.equal(o)` | total ordering (§Appendix E) | sort callbacks |

```javascript
var objX = new Infinitesimal(1);          // 1
objX = objX.nudgePositive();              // 1...1
objX = objX.nudgePositive();              // 1...1[1]  (one nudge past 1...1)

var objY = new Infinitesimal('1...1');
var objSum = objY.add(new Infinitesimal('1...1'));  // 2...2  (elevations add)
```

### 7.3 The Certified Use — Tally, Compare, Sort

Every application in the shipped harness uses exactly three moves: **tally** (`nudgePositive`), **compare** (`compare`), **sort**. It never relies on magnitude-times-magnitude arithmetic — which is why the certified core (§9) stands on the ordering alone, independent of the open arithmetic questions in §5.3.

```javascript
// Byte-frequency tally: 256 counters, each an Infinitesimal
var objProb = new ByteProbabilityArray();   // all start at 1/256
objProb.nudgeByteUp(65);                     // observe an 'A'
objProb.nudgeByteUp(65);
var intTop = objProb.getMostLikely();        // compare-based argmax
```

### 7.4 What "Infinite Loop" Means Here

Because ten first-order nudges complete one base ULP (§5.1), a loop that increments by `...1` and runs until the base advances is finite and terminates — it takes ten steps per ULP, not infinitely many. A genuinely unbounded loop requires the *infinite* tier (reciprocal of an infinitesimal), which is why §2.2's single-digit scale spanning both tiers is being split in revision (see §11 and the notes below).

### 7.5 Planned Extensions (Not Yet Implemented)

Two generalisations are planned. Both follow the same pattern — take a hardcoded constant and make it a construction-time parameter — and both leave the certified core (§9) intact **provided the injected parameter satisfies the contract the core depends on.** That proviso is the design law: the framework stays sound if and only if what you plug in supplies what the core needs. The contracts are pinned here, before implementation, because one of them has a silent trap that is far cheaper to prevent in the spec than to debug in code.

**Configurable elevation count (radix).** Today the value 10 is wired into three places: the ULP-carry threshold (elevation > 9 rolls the base), the single display digit, and the 1–9 magnitude range. Making it a construction parameter `N` turns *base-10 elevations* into *base-N elevations*, which is more honest about what elevation always was — a positional digit (§2.4). Consequences and obligations:

- The carry threshold becomes `> N−1`; every `elevation > 9` / `< -9` test reads the instance's `N`.
- `N` becomes a resolution knob: N elevation-steps complete one base ULP, so larger N = a finer infinitesimal ladder between consecutive reals, smaller N = coarser. This is the "how many distinguishable infinitesimal levels sit between two reals" dial.
- **Obligation — display past N=10.** A single digit cannot render elevation 12. Choose a delimiter that does **not** collide with the existing nudge bracket `[count]` (e.g. `1...{12}[3]` for elevation-12, three nudges), and write it into Appendix B before coding, so the two bracket meanings never ambiguate.
- **Obligation — cross-radix arithmetic.** Adding an N=10 value to an N=16 value has no canonical meaning. v1 should **forbid** mixed-radix operations with a clear error (as one cannot meaningfully add mod-7 and mod-12 numbers); "mixed-radix promotion" is future work. Silently allowing it corrupts results.

**Vector bases via callback.** Today the base is a scalar float. Letting the base be a vector whose arithmetic is supplied by a callback turns `Infinitesimal` from "a number with an infinitesimal tail" into "a *container* that adds an infinitesimal-ordering layer over any element type that supplies its own operations." This is the same architectural move as the learner's pluggable similarity slot (§9.6): the framework owns the tier structure, the caller injects the element behaviour.

- **Load-bearing obligation — the callback MUST supply a total order.** The entire certified core (§9) rests on `compare` being a *total order*; that is what makes it consistency-question-free. Scalars order naturally. **Vectors do not** — is `(1,5)` greater or less than `(3,2)`? There is no answer without choosing (lexicographic, by magnitude, by a supplied key). Therefore the vector callback contract must require `add`, `multiply`, **and** `compare` (plus `equal` and a zero/identity element). The `compare` is not garnish — it is the precondition that keeps the certified core certified. The framework must **refuse to construct** a vector-based infinitesimal that does not supply a total-order comparison, because a vector base without one silently demotes the whole framework from "sound ordered structure" to "inconsistent," with no announcement.

The unifying law for both: elevation-count generalises the *radix*, vector-base generalises the *element*, and each preserves soundness exactly when the injected parameter meets the core's precondition — a valid carry threshold for radix, a valid total order for vectors.

---

## 8. Advantages Over Traditional Notation

| Feature | Traditional | Infinitesimal Framework |
|---------|-------------|------------------------|
| **Infinitesimal hierarchy** | None (just ε) | ...1, ...2, ...3 |
| **Infinity hierarchy** | None (just ∞) | ...9 (largest), ...8 (next) |
| **Directional limits** | a⁺, a⁻ | a +...1, a -...1 |
| **Programmability** | None | Direct implementation |
| **ASCII compatibility** | Requires special symbols | Pure ASCII |
| **Intuitive meaning** | Abstract | "One-ish, but a tiny bit more" |
| **Unified number line** | Disjoint | Continuous spectrum |

---

## 9. Practical Pattern Matching with Infinitesimals

> **This section is the certified core of the framework.** Everything below rests on only three operations — **tally** (`nudgePositive`), **compare**, and **sort** — which together form a *total order* on the number type. A total order has no consistency questions: it cannot contradict itself the way the arithmetic of §5.3 still might. So while the field arithmetic is a work in progress with fenced open questions, the pattern-matching capability is sound *as it stands* and is what the 20-test harness actually exercises. Read §5 as the frontier and §9 as the finished foundation. (For readers who know the territory: the ordering-by-appended-symbols construction is the same idea underlying Conway's surreal numbers, reached here independently from a horse-racing photo-finish problem — see Appendix F.)

The true power of the infinitesimal framework emerges when working with **relationships between multiple infinitesimals**, not single values. By encoding spatial, temporal, or structural relationships as infinitesimal magnitudes, we can create unique, comparable signatures for complex patterns.

### 9.1 Pattern Signature Matching

The framework enables a novel approach to pattern matching where strings, shapes, or sequences are converted into signatures based on character relationships at specific offsets:

```javascript
function buildPatternSignature(str) {
    var signature = {};
    for (var i = 0; i < str.length; i++) {
        for (var j = 0; j < str.length; j++) {
            if (i === j) continue;
            var key = str[i] + ',' + str[j] + ',' + (j - i);
            if (!signature[key]) signature[key] = new Infinitesimal(0);
            signature[key] = signature[key].increment();
        }
    }
    return signature;
}
```

This creates a unique fingerprint for any string, where matching relationships accumulate infinitesimal magnitudes. The test results demonstrate the power of this approach:

```
"ABC" vs "ABC": 0...12 (perfect match)
"ABC" vs "ABE": 0...4  (partial match)  
"ABC" vs "CBA": 0      (different order)
"ABC" vs "XYZ": 0      (different characters)
```

**What the representation provides vs. what the similarity function decides.** The `CBA` result is worth reading carefully, because it marks a boundary that is easy to misattribute. `ABC` vs `CBA` scores 0 — same letters, reversed — because this demo signature is built from *signed* offsets `(char_i, char_j, j−i)`: it is a **forward** analysis, so reversing the string flips every relationship and the match vanishes. A human calls those two "the same letters backwards"; the forward signature calls them maximally different. Whether that is correct depends entirely on the task (right for sequence-preserving similarity, wrong for anagram detection).

The key point is *where* that blind spot lives. Three layers, and only the middle one is responsible:

1. **The representation (the infinitesimal)** — can hold multi-dimensional accumulated similarity with ordering preserved and unbounded tie-break resolution, which a single float cannot. This is a genuine, task-independent capability: a float would collide the fine distinctions and cannot carry "many small agreements pile up into an ordering."
2. **The similarity function (the plugin)** — decides *what similarity means*, and therefore owns every blind spot. Forward-analysis missing reversals and reflections is a property of *this chosen callback*, not of the number type or the framework. Want reversals caught? Register a different callback — an unsigned `|j−i|` signature, a bidirectional one, or a Levenshtein-based one. The misses are relocatable to the plugin *by design*.
3. **The core (tally, compare, sort)** — is agnostic to both and stays sound regardless of which plugin occupies the slot.

So the accurate statement is not "the framework can't handle reversals" — it is "the *default demonstration callback* doesn't, and it is designed to be replaced." The infinitesimal makes *storing and ordering* rich similarity possible; the plugin determines *whether the right things are called similar*; the core stays certified either way.

### 9.2 Fuzzy String Matching

The framework excels at fuzzy matching tasks, such as spell checking and approximate string comparison:

```
"hello world" vs "hello world": 0...220 (perfect)
"hello world" vs "hallo world": 0...180 (close)
"hello world" vs "hello word": 0...148 (missing chars)
"hello world" vs "world hello": 0...92 (reversed)
"hello world" vs "goodbye world": 0...64 (very different)
```

The magnitudes naturally encode similarity, with closer matches receiving higher scores—exactly like the racing string trick that inspired this framework.

### 9.3 Tolerance-Based Pattern Recognition

Real-world recognition requires tolerance for variation. The infinitesimal framework handles this elegantly through **tolerance matrices** that define acceptable ranges:

```javascript
function TolerancePattern(width, height) {
    var min = [], max = [], ideal = [];
    
    this.setRange = function(x, y, minVal, maxVal, idealVal) {
        min[y][x] = new Infinitesimal(minVal);
        max[y][x] = new Infinitesimal(maxVal);
        ideal[y][x] = new Infinitesimal(idealVal || (minVal + maxVal) / 2);
    };
    
    this.evaluate = function(x, y, value) {
        var val = new Infinitesimal(value);
        if (val.lessThan(min[y][x]) || val.greaterThan(max[y][x]))
            return new Infinitesimal(0);
        
        var distance = val.subtract(ideal[y][x]).abs();
        var tolerance = max[y][x].subtract(min[y][x]);
        var halfTolerance = tolerance.divide(new Infinitesimal(2));
        var score = new Infinitesimal(1).subtract(distance.divide(halfTolerance));
        
        if (distance.getBase() === 0) score = score.nudgePositive();
        return score;
    };
}
```

This approach handles natural variation beautifully:

| Type | Nose Length | Score |
|------|-------------|-------|
| **Normal** | 4cm (ideal) | 1...9 |
| **Albanese** | 4.5cm (within range) | 0...8 |
| **Pinocchio** | 12cm (outside range) | 0 |

### 9.4 Spatial Pattern Recognition

The framework extends naturally to two-dimensional patterns, enabling applications like handwriting recognition, facial feature detection, and shape matching:

```javascript
function SpatialPattern(width, height) {
    var grid = [];
    for (var y = 0; y < height; y++) {
        grid[y] = [];
        for (var x = 0; x < width; x++) {
            grid[y][x] = new Infinitesimal(0);
        }
    }
    
    this.recordPoint = function(x, y, intensity) {
        for (var i = 0; i < intensity; i++) {
            grid[y][x] = grid[y][x].nudgePositive();
        }
    };
    
    this.compareTo = function(other) {
        var score = new Infinitesimal(0);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var diff = grid[y][x].subtract(other.grid[y][x]).abs();
                if (diff.getBase() === 0 && diff.getMagnitude().length === 0) {
                    score = score.add(new Infinitesimal(1));
                } else {
                    var similarity = new Infinitesimal(1).subtract(
                        new Infinitesimal(diff.getMagnitude().length / 10)
                    );
                    score = score.add(similarity);
                }
            }
        }
        return score.divide(new Infinitesimal(width * height));
    };
}
```

### 9.5 Test Harness Results

The complete test harness demonstrates the framework's capabilities across multiple domains:

| Test | Description | Result |
|------|-------------|--------|
| **1-6** | Core infinitesimal operations | ✅ All working |
| **7-8** | Custom similarity callbacks | ✅ Euclidean, cosine working |
| **9** | Property statistics | ✅ Correct weight accumulation |
| **10** | Threshold filtering | ✅ Working |
| **11** | Serialization | ✅ Preserves infinitesimals |
| **12** | Regular vs infinitesimal mode | ✅ Both work |
| **13** | Regex gradation | ✅ Proper match ordering |
| **14** | Multiple regex patterns | ✅ Working |
| **15** | Fuzzy matching | ✅ Levenshtein similarity |
| **16** | Byte probability | ✅ Magnitude tracking |
| **17** | Frequency analysis | ✅ Correct 'E' detection |
| **18** | Differential analysis | ✅ XOR difference detection |
| **19** | Bayesian updates | ✅ Probability updates |
| **20** | Probability sorting | ✅ Correct ordering |
| **21** | Extreme nudging | ✅ Truncated clean output |
| **22** | Racing meets cryptanalysis | ✅ Perfect sorting |
| **23** | Pattern signature matching | ✅ Working |

### 9.6 Real-World Applications

The infinitesimal framework enables immediate practical applications:

- **Spell checking** with graduated confidence scores
- **Facial recognition** using spatial tolerance matrices
- **Handwriting analysis** through pattern signatures
- **Cryptanalysis** via difference-based pattern matching
- **Game AI** with NPC confidence levels
- **Plagiarism detection** using structural signatures
- **Biometric authentication** with tolerance ranges

Unlike gradient-trained networks that adjust learned weights over many epochs, infinitesimal pattern recognition works directly from the structure of the data itself—the magnitudes *are* the accumulated evidence, tallied in one pass.

**Accurate positioning (per `jneuralnetwork.js`).** The key architectural fact is that the comparison stage is **pluggable**. The learner exposes `registerSimilarity(propName, fnCallback)`, and at query time it calls that callback with `(queryValue, storedValue, storedWeight)` and combines whatever it returns. The shipped tests install Euclidean, cosine, Jaccard, and gradated-regex callbacks; with no callback registered it falls back to exact/regex match. So the similarity mechanism is not fixed by the design — it is a parameter supplied by the caller.

That means the right description is *structural, not algorithmic*. The framework has **three fixed parts and one open slot**:

| Part | Role | Fixed or open |
|------|------|---------------|
| Weight store | infinitesimal magnitudes, updated by nudging | fixed |
| Combine-and-select | sum per-property scores, rank, attach confidence | fixed |
| Total order | makes ranking, tie-breaking, and confidence fall out of the number type | fixed |
| **Similarity function** | scores query against a stored value, given its weight | **open — injected by the caller** |

Whatever you plug into the open slot decides *which* classical learner you have instantiated:

- Exact / regex match (the default) → a **frequency / Naive-Bayes-style** model.
- Euclidean or cosine over vectors → a **k-nearest-neighbour** learner.
- A thresholded weighted sum → a **perceptron unit** (a minimal neural network).
- A kernel function → a **kernel machine**.
- Reward-driven nudges instead of observation nudges (see below) → a **bandit-style reinforcement learner**.

This is why the "is it a neural network, a kNN, a Bayes model, or RL?" question kept answering *yes*: the code deliberately factored out the one operation that distinguishes those methods and left it as a parameter. The framework is not any of them — it is the **shared layer underneath them**, with the discriminating step pluggable. The infinitesimal type does the unifying work (value, confidence, and update in one object); the callback slot does the specialising work.

**On reinforcement learning — one substitution away.** As the harness drives it, the weight update counts *observations* — it tallies what it saw, not how well its choices scored, which is frequency/Hebbian learning rather than reinforcement learning in the technical sense (no reward signal, no credit assignment, no policy improving toward expected return). But the substrate is already an RL substrate, because the update rule is itself effectively pluggable — feed the nudge a reward instead of an observation:

```javascript
// Frequency mode (as shipped): "I observed this value"
objProb.nudgeByteUp(intObserved);

// Reinforcement mode (one substitution): "this action paid off / didn't"
if (blnActionWasGood_a) { objWeights[intAction] = objWeights[intAction].nudgePositive(); }
else                    { objWeights[intAction] = objWeights[intAction].nudgeBack();     }
// getMostLikely() is now a greedy policy; the infinitesimal weight is a running action-value.
```

No new machinery is required, because the infinitesimal magnitude *already is* an updatable action-value and both nudge directions plus `nudgeBack` already exist. The notation's real trick is exactly what makes both the pluggable-similarity and the pluggable-update work: the value being learned, the confidence in it, and the update to it are the same object.

**Honest one-line positioning:** *a learning framework with a fixed infinitesimal-weighted core and a pluggable similarity slot — instantiable as a frequency model, a kNN, a perceptron, or a kernel machine depending on the injected callback, and one update-rule substitution away from a reinforcement learner. It is the layer those methods share, not a competitor to any one of them.*

### 9.7 Provenance: The Float Original vs. the Infinitesimal Adaptation

The learner did **not** originate with infinitesimals. The first version (`inc-osutils-jneuralnetwork.js`) used plain integer/float weights and works correctly as such. The infinitesimal version is an *adaptation built to demonstrate the datatype* — **both work**; the infinitesimals add specific flexibility, not core capability. Stating this plainly is what keeps the claim defensible: a float does the base job fine, and here is the exact margin the infinitesimal adds on top.

The original is instructive because it shows what is baseline and what is enhancement:

| Aspect | Float original | Infinitesimal adaptation |
|--------|----------------|--------------------------|
| Weight update | `propertyWeights[prop][value] += 1` (integer tally) | `nudgePositive()` (infinitesimal tally) |
| Similarity | **hardcoded** exact-match / regex, inline in `query` | **pluggable** via `registerSimilarity()` |
| Confidence & weight | **two separate numbers** — a percentage score, and a summed integer weight for tie-break | can be **fused into one inspectable value** (magnitude and refinement in the same number) |
| Tie-break resolution | integer-bounded: records with equal summed weight are **indistinguishable** (order undefined between equals) | **unbounded**: the nudge count refines order arbitrarily far — the racing photo-finish property |
| Legibility | `1.0000000000000004` says nothing structural | `1...2[3]` exposes tier and refinement separately |

So the three things the infinitesimal actually buys, precisely — none of them required for the learner to function:

1. **Unbounded tie-break resolution.** A float's mantissa runs out; two close weights eventually collide and the ordering flattens. The nudge count never runs out, so "same magnitude, but this one edged ahead" is always representable. This is the one capability the float genuinely cannot match.
2. **Fused magnitude + refinement.** The float version carries score and tie-break weight as two numbers combined by a rule; the infinitesimal keeps both in one value with the tiers structurally addressable — "confidence rides inside the number."
3. **Structural legibility.** The magnitude string is inspectable in a way a packed float mantissa is not, which matters for debugging and for reasoning about what the learner is doing.

And the honest counterweight, stated **relative to purpose** — because "cost" depends entirely on what you are optimising for. These are JS research libraries, not production components; speed is deliberately not a design axis. Under that goal the usual trade inverts:

- **For production:** a plain float is usually the right call — native, fast, sufficient — and the infinitesimal's string-based magnitude and custom arithmetic *would* be a real cost.
- **For research** (this library's actual purpose): the infinitesimal is the right call *because* it is inspectable and explicit. Legibility is not a nice-to-have here, it is the point — `1...2[3]` shows what the learner is doing; a packed float mantissa hides it. The "custom arithmetic overhead" is not a cost but the object of study, and "a float would be faster" is true and irrelevant, because speed is not the metric being investigated.

So the pure-ASCII notation, the string magnitudes, and the value-legibility are not performance compromises — they are research-tooling decisions, coherent once the goal is "understand what infinitesimal-structured values afford" rather than "run fast." The correct sequence is: validate the *ideas* in a legible slow substrate first; **if** a mechanism earns production use, reimplement that specific mechanism in a fast substrate (typed arrays, packed representation, or a compiled language), carrying over only what proved out. You cannot optimise a mechanism you have not yet understood, so doing the research in the readable form is the right order. The datatype is *demonstrated by* this learner, not *required by* it — which is exactly why the classification in §9.6 stands on the architecture alone, independent of the number type underneath.

*(Note: the pluggable similarity slot itself was added with the adaptation — the float original has fixed exact/regex matching. So "pluggable slot" is a property of the current version, not of the historical baseline.)*

---

## 10. Philosophical Implications

The Infinitesimal Framework reveals that:

1. **Numbers are neighborhoods**, not points
2. **The continuum is granular**—made of discrete magnitudes
3. **Infinity is not singular**—there is a hierarchy of infinities
4. **Infinitesimals are not mysterious**—they're just small numbers
5. **Mathematics and computing can unite**—the same notation works in both

This framework aligns with work on identity:
- **1** = exactly one (binary, fixed identity)
- **1...1** = one-ish, but a tiny bit more (fluid identity)
- **1.-.1** = one-ish, but a tiny bit less
- **1...9** = one-ish, but infinitely more (expansive identity)
- **-1...1** = negative one-ish, but approaching zero (transition)

Just as identity exists on a spectrum, so do numbers.

---

## 11. Future Work

| Area | Research Direction | Status |
|------|-------------------|--------|
| **Tally vs. measure multiplication** | Reconcile §5.3's implemented elevation-multiplication (a tally rule) with a measure rule where sub-ULP × sub-ULP stays sub-ULP | Open; certified apps unaffected (§9) |
| **The 0/0 base seam** | Adopt `⊥`/`⊥'` from *Alien Maths — Division by Zero* for the base tier so `...n ÷ ...m` yields a declared sentinel, not JavaScript `NaN` | Open; the concrete bridge between the two documents |
| **Standard-part `st()`** | Add an operation that returns the base and discards residual magnitude, completing the derivative formula (§6.1) | Open; mirrors the ghost `⊥'` |
| **Two-tier separation** | Split the single 1–9 scale into an infinitesimal tier (`...n`) and an infinite tier (reciprocal `1/...n`), so the neighborhood of zero no longer contains infinity (§2.2 flaw) | Design chosen; not yet in code |
| **Directional nudge on offset values** | Fix the `nudgePositive`/`nudgeNegative` asymmetry noted in §2.4 so direction is honoured when nudging an already-offset number | Known limitation |
| **Configurable radix (elevation count)** | Make the fixed 10 a construction parameter N; needs a non-colliding display for N>10 and a forbid-or-promote rule for mixed radix (§7.5) | Designed, not implemented |
| **Vector bases via callback** | Let the base be a vector with caller-supplied `add`/`multiply`/`compare`; the total-order `compare` is mandatory or the certified core is lost (§7.5) | Designed, not implemented |
| **Higher magnitudes** | Extend beyond elevation 9 within a tier without forcing a base carry, if an absolute (non-ULP) reading is wanted | Open design choice |
| **Complex numbers** | Apply to the complex plane (`i...1`, `i.-.1`) | Speculative |
| **Native language support** | Implement as a first-class numeric type rather than a class | Speculative |

---

## 12. Conclusion

The Infinitesimal Framework of Numbers provides a simple, intuitive, and powerful notation for working with the continuum. By representing infinitesimals and infinities as `...n` and `.-.n`, it unifies mathematics and computing, bridges discrete and continuous, and reveals the neighborhood nature of every number.

The fundamental equation:

```
x ++...n = x...n
x --...n = x.-.n
```

captures the essence of incremental change—whether infinitesimal or infinite—in a notation so simple it can be typed in any text editor, yet so powerful it can express the entire hierarchy of magnitudes between zero and infinity.

The pattern matching capabilities demonstrated in Section 9 show that the true power of infinitesimals lies not in counting, but in encoding relationships. When multiple infinitesimals work together, they create signatures that capture the essential structure of complex patterns—from strings and faces to cryptographic differences.

**Every number is a neighborhood. Every relationship is a signature.**

---

# Corrected Appendices

## Appendix A: Quick Reference

| Notation | Meaning |
|----------|---------|
| `1` | Whole number (base integer) |
| `1...1` | Base 1, positive infinitesimal, elevation 1, zero nudges |
| `1...1[1]` | Base 1, positive infinitesimal, elevation 1, one nudge |
| `1...1[2]` | Base 1, positive infinitesimal, elevation 1, two nudges |
| `1...2` | Base 1, positive infinitesimal, elevation 2, zero nudges |
| `1...2[1]` | Base 1, positive infinitesimal, elevation 2, one nudge |
| `1...3` | Base 1, positive infinitesimal, elevation 3, zero nudges |
| `1...9` | Base 1, positive infinitesimal, elevation 9, zero nudges |
| `1...9[1]` | Base 1, positive infinitesimal, elevation 9, one nudge |
| `1.-.1` | Base 1, negative infinitesimal, elevation 1, zero nudges |
| `1.-.1[1]` | Base 1, negative infinitesimal, elevation 1, one nudge |
| `1.-.2` | Base 1, negative infinitesimal, elevation 2, zero nudges |
| `nudgePositive()` | Append one nudge towards positive (increase nudge count by 1) |
| `nudgeNegative()` | Append one nudge towards negative (increase nudge count by 1) |
| `nudgeBack()` | Remove one nudge (decrease nudge count by 1) |
| `elevateUp()` | Increase elevation by 1 (changes the digit after ...) |
| `elevateDown()` | Decrease elevation by 1 (changes the digit after ...) |

## Appendix B: Display Format

When nudge count is 0: `base...elevation`
Example: `1...2` (elevation 2, zero nudges)

When nudge count is 1 or more: `base...elevation[nudgeCount]`
Example: `1...2[3]` (elevation 2, three nudges)
Example: `0.00390625...1[141]` (elevation 1, 141 nudges)

Long strings of 1's are never displayed. The bracket notation shows the count.

## Appendix C: The Elevation Point Model

### C.1. Elevation and Nudges

The framework has two concepts stored in the magnitude string:

| Concept | Storage Location | Display |
|---------|------------------|---------|
| **Elevation** | First character of magnitude string | The digit after `...` |
| **Nudges** | Remaining characters of magnitude string | The number in brackets `[n]` |

### C.2. The Structure

```
1 (base integer)
├── 1...1 (elevation 1, nudges 0)
│   ├── 1...1[1] (elevation 1, nudge 1)
│   ├── 1...1[2] (elevation 1, nudges 2)
│   └── ... (infinite nudges possible)
├── 1...2 (elevation 2, nudges 0)
│   ├── 1...2[1] (elevation 2, nudge 1)
│   └── ... (infinite nudges possible)
├── ... up to 1...9
└── 2 (next integer after elevation overflow)
```

### C.3. The Operators

| Operator | Effect | Example |
|----------|--------|---------|
| `nudgePositive()` | Increase nudge towards positive count by 1 | `1...1` → `1...1[1]` |
| `nudgeNegative()` | Increase nudge towards negative count by 1 | `1...1` → `1...1[1]` |
| `nudgeBack()` | Decrease nudge count by 1 | `1...1[2]` → `1...1[1]` |
| `elevateUp()` | Increase elevation by 1 | `1...1` → `1...2` |
| `elevateDown()` | Decrease elevation by 1 | `1...2` → `1...1` |

### C.4. Elevation Overflow Rules

When elevation reaches 9 and elevateUp() is called:
- Base increases by 1
- Offset becomes 0 (whole number)
- Magnitude becomes empty string

Example: `1...9.elevateUp() = 2`

When elevation reaches 1 and elevateDown() is called:
- If nudge count is 0: becomes whole number
- If nudge count > 0: elevation becomes 1, nudges preserved

Example: `1...1.elevateDown() = 1` (whole number)
Example: `1...1[3].elevateDown() = 1...1` (nudges reset to 0)

## Appendix D: Arithmetic Rules from Test Output

These are the actual outputs of `infinitesimal.js`. They are the authoritative arithmetic; §5 explains the rules behind them.

### D.1. Addition — bases add, elevations add (signed)

- `1 + 1 = 2`
- `1 + 1...1 = 2...1` (exact base 1 contributes elevation 0)
- `1...1 + 1...1 = 2...2` (elevations 1+1 = 2)
- `1...1 + 1...2 = 2...3` (elevations 1+2 = 3)

### D.2. Subtraction — negate then add

- `2 - 1 = 1`
- `2 - 1...1 = 1.-.1` (offset survives the base subtraction)
- `1...2 - 1...1 = 0...1` (bases cancel to 0, elevations 2−1 = 1)

### D.3. Multiplication — bases multiply, elevations **multiply**

*(Tally semantics — see the honest note in §5.3. Earlier drafts of this document wrongly said elevations add.)*

- `2 * 2 = 4`
- `1...1 * 1...1 = 1...1` (elevations 1×1 = 1)
- `1...1 * 1...2 = 1...2` (elevations 1×2 = 2)

### D.4. Division — bases divide, elevations floor-divide

- `2 / 1 = 2`
- `1 / 1...1 = 1.-.1` (dividing by slightly-more gives slightly-less; correct to first order)
- `1...2 / 1...1 = 1...2` (elevations ⌊2/1⌋ = 2)
- `...1 / ...9` → base `0/0`: currently JavaScript `NaN` — the seam that wants `⊥` (§5.4, §11)

## Appendix E: Comparison Rules

### E.1. Ordering

1. Compare bases first
2. If bases equal, compare offsets (1 > 0 > -1)
3. If offsets equal and non-zero, compare elevation (digit after ...)
4. If elevations equal, compare nudge count

Examples from test output:
- `1 < 1...1` (base equal, offset 0 < 1)
- `1...1 < 1...2` (elevation 1 < 2)
- `1...1[2] > 1...1[1]` (more nudges)

### E.2. Equality

Two infinitesimals are equal iff:
- Same base
- Same offset
- Same elevation
- Same nudge count

## Appendix F: The Racing Origin

### F.1. The Problem

In horse racing, photo finishes require distinguishing between horses that finish too close to call. Traditional terms: "a nose," "a head," "a neck" work as ordering devices but have no absolute definition.

### F.2. The Insight

Absolute measures don't matter—only ordering matters. To encode "slightly behind," use strings that sort correctly:

```
"1"   = exactly 1st
"11"  = 1st + nose (sorts between "1" and "2")
"111" = 1st + head (sorts between "11" and "2")
"2"   = exactly 2nd
```

### F.3. From Strings to Infinitesimals

| Racing Concept | Framework Concept |
|----------------|-------------------|
| Base number (`"1"`) | Base integer |
| Appended `"1"` | Nudge operation |
| String length | Nudge count |
| Same string = tie | Equal infinitesimals |
| Next after tie = base + count | Elevation overflow |

## Appendix G: Glossary of Terms

| Term | Definition | Example |
|------|------------|---------|
| **Base** | The integer part of an infinitesimal number | In `1...2[3]`, base = `1` |
| **Offset** | Direction of infinitesimal (`+1` or `-1`) | `...` = +1, `.-.` = -1 |
| **Elevation** | The digit after `...` or `.-.` | In `1...2[3]`, elevation = `2` |
| **Nudge Count** | Number of nudges applied | In `1...2[3]`, nudge count = `3` |
| **Magnitude** | Combined elevation + nudges (internal storage) | String like `"2"` or `"2111"` |
| **NudgePositive** | Increase nudge positive count by 1 | `1...1` → `1...1[1]` |
| **NudgeNegative** | Increase nudge negative count by 1 | `1...1` → `1...1[1]` |
| **NudgeBack** | Decrease nudge count by 1 | `1...1[2]` → `1...1[1]` |
| **ElevateUp** | Increase elevation by 1 | `1...1` → `1...2` |
| **ElevateDown** | Decrease elevation by 1 | `1...2` → `1...1` |

## Appendix H: Implementation Notes

### H.1. Core Data Structure

```javascript
function Infinitesimal(args_a) {
    var m_objBase = null;      // integer part
    var m_intOffset = 0;       // 0, 1, or -1
    var m_strMagnitude = '';   // first char = elevation, rest = nudges
}
```

### H.2. Display Logic

```javascript
this.toString = function()
{
    if (m_intOffset === 0) return m_objBase.toString();
    
    var strResult = m_objBase.toString();
    strResult += (m_intOffset === 1) ? '...' : '.-.';
    
    if (m_strMagnitude.length === 0) return strResult;
    
    var strElevation = m_strMagnitude.charAt(0);
    var intNudges = m_strMagnitude.length - 1;
    
    strResult += strElevation;
    if (intNudges > 0) strResult += '[' + intNudges + ']';
    
    return strResult;
};
```

### H.3. Key Methods

| Method | Effect |
|--------|--------|
| `nudgePositive()` | `m_strMagnitude += '1'` towards positive |
| `nudgeNegative()` | `m_strMagnitude += '1'` towards negative |
| `nudgeBack()` | Remove last character from `m_strMagnitude` |
| `elevateUp()` | Increase first character of `m_strMagnitude` by 1 |
| `elevateDown()` | Decrease first character of `m_strMagnitude` by 1 |
| `compare()` | Compare two infinitesimals |

### H.4. Design Principles

1. **No early returns** — single exit point at end of each function
2. **Hungarian notation** — `m_` for members, `_a` for arguments
3. **ES5 compatibility** — no ES6+ features
4. **Explicit over implicit** — elevation never happens automatically
5. **Bracket display** — long nudge strings shown as `[count]`