# Random Maths Stuff

Two companion extensions to standard arithmetic, each an opt-in tool with declared rules and a stated purpose. They meet at zero: infinitesimals govern the *approach* to zero; division-by-zero governs the *point* itself.

## Alien Maths — Division by Zero

An alternative framework that makes division by zero total, using two declared sentinel values (`⊥` "poison", `⊥'` "ghost") instead of banning the operation. Every expression evaluates; error-handling becomes arithmetic. See `alien-maths-division-by-zero.md`.

## Alien Maths — Infinitesimals

A practical, programmable infinitesimal framework using pure-ASCII `...n` / `.-.n` notation, with a working reference implementation (`infinitesimal.js`) and a learning framework built on it (`jneuralnetwork.js`). That learner has a fixed infinitesimal-weighted core and a **pluggable similarity slot** — inject a callback and it instantiates as a frequency model, a kNN, a perceptron, or a kernel machine; swap the update rule and it becomes a reinforcement learner. It is the layer those methods share, not a competitor to any one of them. The certified core — tally, compare, sort over a total order — powers fuzzy matching, frequency analysis, and confidence-scored recognition. See `alienmaths-infinitesimals.md`.

## The Bridge

Dividing by an infinitesimal is defined and enormous (`1/...n`); dividing by exactly zero is a declared sentinel (`1/0 = ⊥`). The base tier of the infinitesimal framework is intended to adopt the `⊥`/`⊥'` values so that `0/0` stops being a platform `NaN` and becomes a principled result. This is the concrete seam joining the two documents.

## The Button

Everybody has watched the 2009 movie "The Box" right?

The Box is a psychological thriller film about a financially struggling couple, Norma and Arthur Lewis, who receive a mysterious wooden box from a stranger. The stranger presents a tempting offer: if they press the button inside the box, they will receive one million dollars in cash, but someone they do not know will die. Despite their moral doubts, Norma presses the button, and they soon receive the money. However, this act unleashes a wave of terrifying consequences as the couple is pulled into a dark, supernatural conspiracy. They quickly realize that the box is part of a larger test for humanity conducted by higher entities, and they must face a tragic, impossible choice to pay for their actions.

This app is... The Button.  Complete with tutorial, this fun little application will let you create one of the most useful and simple applications ever.  It invokes a URL and displays a user defined message on success and failure along with a timer since last push.

Build as many for your phone as you have uses for, ping a server to see if it's up? Trigger a backup? Trigger data deletion? Make it behave as though it were "The Box".  Is the timer since last prevention of something bad? or since last something good?  The flexibility and ambiguity is up to you - and it's perfect for keeping someone on their toes if they get access to your phone without your permission!

## License

MIT — see `LICENSE`.