//var tbRecords=[];
function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));
    var TSHLevel = user.FirstName;

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var TSH = tbRecords[i].LH;

    console.log(i);
    console.log(TSH);

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, TSHLevel, TSH);

  }
}

function drawAdviceCanvas(ctx, TSHLevel, TSH) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(TSHLevel + ", Your Latest Lrn.Hrs. is " + TSH +
    "Hrs.", 25, 320);

  if (TSH >=0 && TSH<=8) {
    ctx.fillText(
      "Ramp it up!! you are lagging behind",
      25, 350);

      ctx.fillText(
        "your target of 12Hrs a day",
        25, 375);
  //  writeAdvice(ctx, "red");
    //levelAwrite(ctx, TSH);
    levelAMeter(ctx, TSH);
  } else if (TSH >8 && TSH<=12) {
    ctx.fillText(
      "You are doing a great job. keep it up!!",
      25, 350);
//    writeAdvice(ctx, "green");
    //levelBwrite(ctx, TSH);
    levelAMeter(ctx, TSH);
  } else if (TSH >12) {
    ctx.fillText(
      "Cool it down!! Do take some rest",
      25, 350);
//    writeAdvice(ctx, "yellow");
  //  levelCwrite(ctx, TSH);
    levelAMeter(ctx, TSH);
  }
}

/*//For deciding what to write for given values of TSH level A
function levelAwrite(ctx, TSH) {
  if ((TSH >= 0.01) && (TSH <= 0.1)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 0.1) && (TSH <= 0.5)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelBwrite(ctx, TSH) {
  if ((TSH >= 0.1) && (TSH <= 0.5)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 0.5) && (TSH <= 2.0)) {
    writeAdvice(ctx, "yellow");
  } else if ((TSH >= 0.01) && (TSH < 0.1)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelCwrite(ctx, TSH) {
  if ((TSH >= 0.35) && (TSH <= 2.0)) {
    writeAdvice(ctx, "green");
  } else if ((TSH > 2) && (TSH <= 10)) {
    writeAdvice(ctx, "yellow");
  } else if ((TSH >= 0.1) && (TSH < 0.35)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
} */

/* function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "Please consult with your family";
    adviceLine2 = "physician urgently.";
  } else if (level == "yellow") {
    adviceLine1 =
      "Contact family physician and recheck bloodwork";
    adviceLine2 = "in 6-8 weeks.";
  } else if (level = "green") {
    adviceLine1 =
      "Repeat bloodwork in 3-6 months.";
  }
  ctx.fillText("Your TSH-level is " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
} */

function levelAMeter(ctx, TSH) {
  //if (TSH <= 8) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 24, TSH)
      .Set("chart.colors.ranges", [
        [0, 8, "red"],
        [8,12, "#0f0"],
        [12, 24, "yellow"]
      ]);
  //} else {
  /*  var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 24, TSH)
      .Set("chart.colors.ranges", [
        [0.5, 3, "red"],
        [0.1, 0.5, "yellow"],
        [0.01, 0.1, "#0f0"],
        [3.01, TSH, "red"]
      ]);
  } */
  drawMeter(cg);
}
/*
function levelBMeter(ctx, TSH) {
  if (TSH <= 3) {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 3, TSH)
      .Set("chart.colors.ranges", [
        [2.01, 3, "red"],
        [0.51, 2, "yellow"],
        [0.1, 0.5, "#0f0"],
        [0.01, 0.1, "yellow"]
      ]);
  } else {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, TSH, TSH)
      .Set("chart.colors.ranges", [
        [2.01, 3, "red"],
        [0.51, 2, "yellow"],
        [0.1, 0.5, "#0f0"],
        [0.01, 0.1, "yellow"],
        [3, TSH, "red"]
      ]);
  }
  drawMeter(bcg);
}

function levelCMeter(ctx, TSH) {
  if (TSH <= 15) {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 15, TSH)
      .Set("chart.colors.ranges", [
        [10.01, 15, "red"],
        [2.01, 10, "yellow"],
        [0.35, 2, "#0f0"],
        [0.1, .34, "yellow"]
      ]);
  } else {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, TSH, TSH)
      .Set("chart.colors.ranges", [
        [10.01, 15, "red"],
        [2.01, 10, "yellow"],
        [0.35, 2, "#0f0"],
        [0.1, 0.34, "yellow"],
        [15.01, TSH, "red"]
      ]);
  }
  drawMeter(ccg);
} */

// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", " Hrs")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Learning Meter")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}
