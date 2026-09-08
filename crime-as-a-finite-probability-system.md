# The Actuarial Survival Model: Crime as a Finite Probability System

## Overview

This paper formalizes a self-centered, probability-based framework for individual survival within a finite human life span. Operating strictly under the laws of combinatorics and actuarial risk analysis, the model treats ambient crime as a finite pool of discrete events distributed across a population. It evaluates how external victimhood, offender exhaustion, population mechanics, and incapacitation dictate an individual's personal safety trajectory over time.

---

## Core Mathematical Framework

An individual's immediate probability of becoming a crime victim at any given point in time is governed by the ratio of active, unspent crimes to the available target population:

$$\text{Immediate Risk} = \frac{\text{Active Unspent Crimes}}{\text{Total Living Population Excluding Self}}$$

* **The Numerator (Active Unspent Crimes):** The aggregate sum of remaining lifetime offenses that active criminals will commit before death, retirement, or permanent incarceration.
* **The Denominator (Population Shield):** The total living population excluding the individual. This group functions as a statistical buffer absorbing prospective offenses.

---

## Primary System Dynamics

**1. The Finite Crime Pool and Offender Exhaustion**
* **Offender Quotas:** No criminal possesses an infinite capacity to commit offenses due to finite lifespans. Every criminal carries a finite lifetime offense count (1-time, $n$-time, or repeat offenders).
* **Quota Depletion:** Every non-fatal crime committed against another individual permanently removes an offense from the active numerator.
* **Risk Reduction:** Because the specific offense is spent on a stranger, the probability of that distinct event landing on the target individual drops to zero, lowering overall lifetime exposure.

**2. The Asymptotic Decay of Lifetime Exposure**
* **Finite Clock:** An individual's remaining lifetime is bounded and constantly counting down.
* **Asymptotic Limit:** As time progresses and days are survived without incident, total remaining potential crime opportunities approach zero ($\lim_{t \to T} \text{Risk}(t) = 0$).
* **System Noise:** Temporary regional spikes or drops in crime represent short-term volatility on a graph; however, the overarching lifetime exposure vector retains its downward trajectory toward zero.

---

## Variables Affecting the Population Shield

| Event Type | Numerator Impact | Denominator Impact | Net Effect on Personal Safety |
| :--- | :--- | :--- | :--- |
| **Non-Fatal Offense (Stranger Target)** | Decreases (-1 spent offense) | Unchanged | **Positive** (Reduces threat pool; shield intact) |
| **Natural Death of Stranger** | Unchanged (No threat resolved) | Decreases (-1 person) | **Neutral / Negligible** (No active threat shift) |
| **Homicide of Stranger** | Decreases (-1 spent offense) | Decreases (-1 shield target) | **Negative** (Compresses remaining risk onto fewer survivors) |
| **Mass Casualty Event** | Decreases rapidly | Collapses rapidly | **Negative (Short-term)** / **Positive (Long-term)** |

---

## Mass Murder and the Incapacitation Effect

Mass casualty events introduce extreme shocks to the model through opposing mechanisms:

* **Immediate Shock (Denominator Collapse):** The rapid loss of multiple individuals abruptly shrinks the population shield, concentrating any remaining external threats onto a smaller pool of survivors.
* **Permanent Incapacitation (Numerator Neutralization):** Mass offenders draw absolute law enforcement focus, leading to rapid death or permanent life imprisonment. Their active offense potential drops permanently to zero ($0$).
* **Net Balance:** While mass casualty events cause a severe short-term collapse of the risk-absorbing population, the immediate and permanent neutralization of the offender eliminates long-term recurring threat vectors.

---

## Conclusion

When stripped of moral and empathetic considerations, individual survival within a populated society functions as a strict game of statistical evasion. The model demonstrates that in a finite system, non-fatal offenses committed against third parties act as a protective buffer, systematically reducing an individual's remaining lifetime exposure decimal.