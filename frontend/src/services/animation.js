const stages = {
    stage0: "Animated GIFs/pot.gif",
    stage1: "Animated GIFs/layer1.gif",
    stage2: "Animated GIFs/layer2.gif",
    stage3: "Animated GIFs/layer3.gif",
    fail: "Animated GIFs/flower death.gif"
  };  
  
  export default function selectStage(typed,total,fail=false) {
    const percentageTyped= (typed/total)*100;
    if (fail) {
      return stages.fail;
    }
    else if (0<=percentageTyped < 25) {
      return stages.stage0;
    } else if (25<= percentageTyped < 50) {
      return stages.stage1;
    } else if (50<= percentageTyped < 75) {
      return stages.stage2;
    } else  {
      return stages.stage3;
    }
  }