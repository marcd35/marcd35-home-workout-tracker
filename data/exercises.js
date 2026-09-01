export const exercises = [
  ['shoulder-circles','Shoulder circles','warmup','10–15','1',30,'Bodyweight'],
  ['band-pull-aparts','Band pull-aparts','warmup','12–15','2',45,'Band'],
  ['scapular-pull-ups','Scapular pull-ups','warmup','5–8','2',60,'Pull-up bar'],
  ['bodyweight-squats','Bodyweight squats','warmup','10–15','1',45,'Bodyweight'],
  ['hip-hinges','Hip hinges','warmup','10–12','1',45,'Bodyweight'],
  ['easy-push-ups','Easy/incline push-ups','warmup','8–10','1',45,'Bodyweight'],
  ['light-dumbbell-rows','Light dumbbell rows','warmup','8–10 per side','1',45,'Dumbbells'],
  ['light-shoulder-presses','Light shoulder presses','warmup','8','1',45,'Dumbbells'],
  ['pull-ups','Pull-ups','strength','Comfortable baseline','1',120,'Pull-up bar'],
  ['chin-ups','Chin-ups','strength','Comfortable baseline','1',120,'Pull-up bar'],
  ['push-ups','Push-ups','strength','1–2 reps in reserve','1',90,'Bodyweight'],
  ['goblet-squat','Goblet squat','strength','10–15','2',120,'Dumbbell'],
  ['dumbbell-row','Dumbbell row','strength','10–15 per side','2',120,'Dumbbells'],
  ['dumbbell-rdl','Dumbbell Romanian deadlift','strength','10–15','2',120,'Dumbbells'],
  ['dumbbell-shoulder-press','Dumbbell shoulder press','strength','8–12','2',120,'Dumbbells']
].map(([id,name,category,defaultRepTarget,defaultSetTarget,defaultRestDuration,equipment]) => ({ id, name, category, defaultRepTarget, defaultSetTarget: Number(defaultSetTarget), defaultRestDuration, equipment, notes: '' }));
