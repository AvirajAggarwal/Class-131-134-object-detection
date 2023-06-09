dog_cat=""
status1=""
objects=[]

function preload ()
{
dog_cat=loadImage("dog_cat.jpg");
}
function draw()
{
image(video,0,0,640,420);

if (status1!="")
{
 objectDetector.detect(video,gotResult);
 document.getElementById("status").innerHTML= "Status: Object Detecting";
 length=objects.length;
 document.getElementById("number_of_objects_detected").innerHTML="Number of detected objects are :"+length;
 for (i=0;i<length;i++)
 {
    object_name=objects[i].label;
    object_x=objects[i].x;
    object_y=objects[i].y;
    object_width=objects[i].width;
    object_height=objects[i].height;
    object_confidence=Math.floor(objects[i].confidence*100);

    fill("red");
noFill();
text(object_name+" "+object_confidence+"%",object_x,object_y+15);
stroke("red");
rect(object_x,object_y,object_width,object_height);

 }

 
}

}
function setup()
{
canvas=createCanvas(640,420);
canvas.center();

video=createCapture(VIDEO);
video.size(400,350);
video.hide();

objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded");
    status1=true;
   
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }
   
       
        console.log(results);
        objects=results;
}
