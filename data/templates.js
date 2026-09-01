export const templates = [{
  id: 're-entry-full-body', name: 'Re-entry full body', description: 'A measured return to full-body strength work.',
  warmup: ['shoulder-circles','band-pull-aparts','scapular-pull-ups','bodyweight-squats','hip-hinges','easy-push-ups','light-dumbbell-rows','light-shoulder-presses'],
  exercises: [
    ['pull-ups',1], ['chin-ups',1], ['push-ups',1], ['goblet-squat',2], ['dumbbell-row',2], ['dumbbell-rdl',2], ['dumbbell-shoulder-press',2]
  ].map(([exerciseId,setTarget]) => ({ exerciseId, setTarget }))
}];
