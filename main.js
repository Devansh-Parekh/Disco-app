var song1="";
var song2="";
var leftwristx=0;
var leftwristy=0;
var rightwristx=0;
var rightwristy=0;
var scoreleftwrist=0;
var scorerightwrist=0;
var song1status="";
var song2status="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);

}
function modelLoaded(){
    console.log("poseNet is loaded");
    }
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
   stroke("FF0000");
   song1status=song1.isPlaying();
   song2status=song2.isPlaying();
   if(scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,20);
    song1.stop();
    if(song2status==false)
    {song2.play();}
    document.getElementById("song").innerHTML="Playing : Kesariya"
   }
   if(scorerightwrist>0.2){
    circle(rightwristx,rightwristy,20);
    song2.stop();
    if(song1status==false)
    {song1.play();}
    document.getElementById("song").innerHTML="Playing : Believer"
   }
}
function preload(){
    song1=loadSound("Believer.mp3");
    song2=loadSound("Kesariya.mp3");

}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
    }
}
