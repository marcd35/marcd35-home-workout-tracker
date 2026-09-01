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
