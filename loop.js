let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;







let arr = []; //push points here
let shape =[]; //to check point checker shape
let tri_arr;

let mouse_point = new Vec2d(0,0);
let show = false

document.addEventListener("click", function(e){

    let x = e.clientX;
    let y = e.clientY;
    
    let point = new Vec2d(x,y);
    arr.push(point);
    
})

document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        show = !show

        shape = arr;
        tri_arr = ear_clipping(shape);
    
    }
})

document.addEventListener("mousemove", function(e){
    mouse_point.x = e.clientX;
    mouse_point.y = e.clientY;
})

function ear_clipping(arr){

    //create a duplicate arr
    let temp_arr =[];

    for(let i=0;i<arr.length;i++)
    {
        temp_arr.push(arr[i]);
    }

    //create a triangle array 
    let tri_arr=[];

    let no_tri =false;
    //while(temp_arr != 0)
        //if temp_arr size is 3 
            //add then three vertices to tri_arr
            //return tri_arr

        //else
            //for every vertex in the temp_arr 
                //check if the angle is convex
                    //if yes then make a triangle from the previous and next vertices
                        //check if there is another point in the newly made triangle
                            //if no then add the triangle vertices to the tri_arr and remove the vertex from temp_arr and break from the loop
                            //if yes then move to the next vertex
                    //if no then move on to the new vertex

    if(temp_arr.length <3){return null;}

    while(temp_arr.length !=0){

        if(temp_arr.length === 3)
        {
           for(let i=0;i<3;i++)
                tri_arr.push(temp_arr[i]);
            return tri_arr;
        }

        else if(no_tri == true){return tri_arr;}

        else
        {
            for(let i=0;i<temp_arr.length;i++)
            {
                no_tri = true;
                //check if angle is convex
                let crossVec = vec_crossproduct( vec_sub( temp_arr[(i-1 +temp_arr.length )%temp_arr.length] , temp_arr[i]) ,  vec_sub( temp_arr[(i+1)%temp_arr.length] , temp_arr[i]) );
              
                if(crossVec.z > 0) //its convex
                {
                    //create a tiangle
                    let tri = [temp_arr[(i-1+temp_arr.length)%temp_arr.length] ,temp_arr[i], temp_arr[(i+1)%temp_arr.length]];
                    //check if there is any other point inside that triangle
                    let collision = false;
                    for(let j=0 ; j<temp_arr.length;j++)
                    {
                        if( j===i || j===(i-1+temp_arr.length)%temp_arr.length ||j=== (i+1)%temp_arr.length ) continue; 
                        if(pointChecker_shape(temp_arr[j],tri)===true) collision = true;
                                
                    }
                    //if no then add the triangle to he triangle vector
                    if(!collision)
                    {
                        //push the points in tri_arr
                        for(let i=0;i<3;i++)
                            tri_arr.push(tri[i]);

                        //remove the current vertex from temp_arr
                        temp_arr.splice(i,1);

                        //break from the for loop
                        no_tri=false;
                        break;

                    }

                }
            }
           
        }

        
        
    }
    return tri_arr;

}






function Loop(){

    animationID = requestAnimationFrame(Loop);
    
         //=======handle timing===================//
        let msNow = window.performance.now();
        let dt = msNow - msPrev;
    
        if(dt < msPerFrame) return
        let excessTime = dt % msPerFrame
        msPrev = msNow - excessTime
        msPrev = msNow;
        dt=dt/1000;
       
       //==========================================//
        
       
        //clear screen
            ctx.beginPath();
            ctx.fillStyle = "#505557";
            ctx.fillRect(0,0,canvas.width ,canvas.height);
            //make_checkerboard();
    

        //====================================================================================================
        



        if(shape.length)
        {
            pointChecker_shape(mouse_point,shape);
        }



       

        if(show){

           
                for (let i=0; i<arr.length; i++){
                    DrawLine(arr[i], arr[(i+1)%arr.length], "black")
                }
            
        }
        
        for (let i = 0; i < arr.length; i++){
            
            FillCircle(arr[i], 5, "red")
        }


        if(tri_arr){
            for(let i=0;i<tri_arr.length;i+=3)
            {
                FillTriangle(tri_arr[i],tri_arr[(i+1)%tri_arr.length],tri_arr[(i+2)%tri_arr.length],"yellow","#03e3fc");
            }
        }

        FillCircle(mouse_point,5, shape.length ? pointChecker_shape(mouse_point,shape) ? "red":"black"  :"black"); //to check pointchecker shape

     
    }
    //=======================================================================================     
    
    
    Loop();
    