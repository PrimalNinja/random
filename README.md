# Random Maths Stuff

Two companion extensions to standard arithmetic, each an opt-in tool with declared rules and a stated purpose. They meet at zero: infinitesimals govern the *approach* to zero; division-by-zero governs the *point* itself.

## Alien Maths — Division by Zero

An alternative framework that makes division by zero total, using two declared sentinel values (`⊥` "poison", `⊥'` "ghost") instead of banning the operation. Every expression evaluates; error-handling becomes arithmetic. See `alien-maths-division-by-zero.md`.

## Alien Maths — Infinitesimals

A practical, programmable infinitesimal framework using pure-ASCII `...n` / `.-.n` notation, with a working reference implementation (`infinitesimal.js`) and a learning framework built on it (`jneuralnetwork.js`). That learner has a fixed infinitesimal-weighted core and a **pluggable similarity slot** — inject a callback and it instantiates as a frequency model, a kNN, a perceptron, or a kernel machine; swap the update rule and it becomes a reinforcement learner. It is the layer those methods share, not a competitor to any one of them. The certified core — tally, compare, sort over a total order — powers fuzzy matching, frequency analysis, and confidence-scored recognition. See `alienmaths-infinitesimals.md`.

## The Bridge

Dividing by an infinitesimal is defined and enormous (`1/...n`); dividing by exactly zero is a declared sentinel (`1/0 = ⊥`). The base tier of the infinitesimal framework is intended to adopt the `⊥`/`⊥'` values so that `0/0` stops being a platform `NaN` and becomes a principled result. This is the concrete seam joining the two documents.

## License

MIT — see `LICENSE`.