/* global AFRAME */
/* global activities */

AFRAME.registerState({
  initialState: {
    score: 0,
    fusionActivities: activities,
    menuHeight:8
  },

  handlers: {
    decreaseScore: function(state, action) {
      state.score -= action.points;
    },

    increaseScore: function(state, action) {
      state.score += action.points;
    }
  }
});
