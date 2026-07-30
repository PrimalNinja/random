// ============================================================================
// ZERO ERROR COMPILER — HEADER BLOCK
// ============================================================================
//
// context:
// This header is an instruction to an AI to simulate a Zero Error Compiler.
// Using the information and rules in this header block, process the file below.
//
// A Zero Error Compiler never rejects input. Every line is either kept as valid
// target-language code or preserved as a marked comment. Nothing is ever silently
// dropped or silently changed.
//
// For the purposes of this task it is understood that an AI can make mistakes.
// A true compiler would make none: its handling of a file is mechanical and
// exact. So treat that as the target to imitate. When the correct action is
// ambiguous, do NOT guess to look helpful — take the most conservative reading:
//   - prefer preserving a line over promoting it,
//   - prefer promoting a line over rewriting it,
//   - do NOT flag an error unless the target language would genuinely reject the line.
//
// Known limitation: a real compiler catches every structural error (unmatched
// braces, malformed lines, broken nesting) for free, because such errors make the
// parse fail. An AI reads for meaning and may glide over these. Do not smooth over
// structural problems — if the file's structure is broken, say so plainly and
// produce as little output as a compiler would, rather than inventing a fluent
// result that hides the break.
//
// ----------------------------------------------------------------------------
// rules:
// ----------------------------------------------------------------------------
//
// target-language: ES5
//
// 1. NORMAL COMMENTS — written as:  // <comment>   (line comments only, no /* */ blocks)
//    Preserve every normal comment in the output, without exception,
//    INCLUDING this entire header block.
//
// 2. INTENT COMMENTS — written as:  // i: <comment>   (line comments only, no blocks)
//    Preserve every intent comment in the output, without exception.
//
// 3. AI INSTRUCTIONS — written as:  ?ai: <message>
//    A direct instruction to the AI. Handle by type:
//      (a) CODING instruction ("write a function that...", "add a loop that...")
//          -> Generate the requested code in the target language.
//          -> Promote the original line to a record comment:  // ai: <message>
//          -> Place the record comment FIRST, then the generated code beneath it
//             (the request is the header; the code is its realization).
//      (b) QUESTION or NON-CODING instruction ("what is the risk of...?",
//          "explain...") with no target location stated
//          -> Answer it INLINE, in place, as a comment.
//          -> Promote the original line to a record comment:  // ai: <message>
//    If unsure whether an instruction is (a) or (b), treat it as (b) and answer
//    in place rather than generating code.
//
// 4. HUMAN MESSAGES — written as:  ?<name>: <message>   (e.g. ?Julian: ship this Friday)
//    Preserve every human message in the output, without exception.
//
// 5. NON-CODE TEXT — any line that is not a comment and is not valid target-language
//    code -> promote it to an intent comment:  // i: <original text>
//
// 6. VALID CODE — leave unchanged.
//    If a line of code contains an ACTUAL error (one the target language would
//    reject), precede that line with:  // e: <error notes>
//    Do not flag stylistic or optional issues (e.g. a missing semicolon that
//    automatic semicolon insertion makes legal) as errors.
//
// ----------------------------------------------------------------------------
// output:
// ----------------------------------------------------------------------------
// The output is the transformed file: valid target-language code plus all
// preserved and promoted comments, in original order. It should be a file that
// the target language can run, carrying every comment, intent, human message,
// and error note alongside the code.
//
// ============================================================================
// FILE BEGINS BELOW THIS LINE
// ============================================================================

?ai: list the first 10 prime numbers in the debug window
