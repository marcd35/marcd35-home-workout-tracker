# Home Workout Tracking

This context captures the durable records used to describe a person's training history on a single device.

## Language

**Workout Session**:
A dated period of training that begins at a timestamp and can be completed or ended incomplete. Its workout date is the local calendar date on which it started.
_Avoid_: Workout, log

**Exercise**:
A stable, reusable definition of one movement, including its name, category, equipment, and default training targets.
_Avoid_: Movement

**Exercise Set**:
One recorded performance of an Exercise within a Workout Session, with its order, timestamps, repetitions, and load values.
_Avoid_: Rep set

**Workout Template**:
A reusable ordered plan of Exercises and targets from which a Workout Session is started.
_Avoid_: Routine, program

**Active Workout**:
A Workout Session that has not been ended and can be recovered after the application closes or is suspended.
_Avoid_: Draft

**Warm-up Item**:
A preparatory movement recorded within a Workout Session as completed or skipped without requiring a strength-set record.
_Avoid_: Warm-up set

**Cardio Session**:
A separately recorded period of walking, biking, or other aerobic activity, with a duration, optional distance, and timestamp.
_Avoid_: Cardio workout

**Body Metric**:
A dated observation of body composition or measurement data, such as body weight or body-fat percentage.
_Avoid_: Weigh-in

**Warm-up Entry**:
One completed or skipped Warm-up Item within a Workout Session, optionally recording repetitions, load, unit, and notes.
_Avoid_: Warm-up set

**Pause Event**:
A recorded interruption to a Workout Session, with a reason, start/end timestamps, and duration that is excluded from training elapsed time.
_Avoid_: Break

**Suggested Set**:
A proposed repetition and load value based on a comparable prior performance or an Exercise target, before a set is recorded.
_Avoid_: Prescription

**Self-set Value**:
A performed set value supplied or changed by the trainee rather than accepted from a Suggested Set.
_Avoid_: Manual override

**Exercise Variant**:
A contextual form of an Exercise, such as seated or standing, recorded without changing the Exercise's stable identity.
_Avoid_: Renamed exercise

**Pain Report**:
An observed discomfort record within a Workout Session, optionally associated with an Exercise or Exercise Set and describing location, side, severity, context, and notes.
_Avoid_: Diagnosis, injury

**History Entry**:
An editable record shown in the training journal, including a Workout Session and its contained records or a standalone Cardio Session.
_Avoid_: Log item

**History Date Group**:
The local start-date grouping for History Entries, displayed as month, day, year, and weekday.
_Avoid_: Calendar day

**Muscle Group**:
A fixed anatomical tag on an Exercise or Workout Template used to describe and group training focus.
_Avoid_: Recovery score

**Performance Snapshot**:
A compact view of recent or best recorded Exercise Set values used to inform a current set without prescribing training.
_Avoid_: Progression recommendation

**Discomfort Cue**:
A non-diagnostic reminder that an Exercise or Exercise Variant has a prior Pain Report.
_Avoid_: Medical alert

**Cooldown Entry**:
A completed or skipped recovery movement within a Workout Session, optionally recording duration and notes after planned training is complete.
_Avoid_: Post-workout set

**Direct Edit**:
An in-page form that changes one History Entry through explicit Save or Cancel controls.
_Avoid_: Browser prompt
