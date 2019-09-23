homeImageState=0
totalPages=3
workState=0
totalWorks=4 //you can just get this from looking at html length

function checkHomeState(){
    for(i=0;i<totalPages;i++){
        var currentCount=document.createElement("img")
        currentCount.className="imagecounter no-select"
        if(i==homeImageState){
            currentCount.src="icons/active.png";
        }
        else{
            currentCount.src="icons/inactive.png";
        }

        document.getElementsByClassName("imagecount-container")[0].appendChild(currentCount);


    }
}
function deleteHomeState(){
    for(i=0; i<totalPages;i++){
        var deleteCount=document.getElementsByClassName("imagecounter")[0]
        deleteCount.parentNode.removeChild(deleteCount);
    }
}
function shiftRight(){
    if(homeImageState!=totalPages-1){
        for(i=0;i<totalPages;i++){
        $("#page"+i).animate(
            {left: '+=-100%'},
            {duration:500,
            easing: "swing"})}
        homeImageState+=1
        
        } 
    else{
        var leap = ((100*totalPages)-100)

        for(i=0;i<totalPages;i++){
        $("#page"+i).animate(
            {left: "+="+leap+"%"},
            {duration:500,
            easing: "swing"})
        homeImageState=0;
        }

    }   
        deleteHomeState()
        checkHomeState();

    }
function shiftLeft(){
    if(homeImageState!=0){
        for(i=0;i<totalPages;i++){
        $("#page"+i).animate(
            {left: '+=100%'},
            {duration:500,
            easing: "swing"})}
        homeImageState-=1
        
        } 
    else{
        var leap = ((100*totalPages)-100)

        for(i=0;i<totalPages;i++)
        $("#page"+i).animate(
            {left: "+=-"+leap+"%"},
            {duration:500,
            easing: "swing"})
        homeImageState=totalPages-1;

    }   
        deleteHomeState()
        checkHomeState();

}
function ArrowClick(){
    $(document).on("click","#arrow1",function(){
        shiftLeft();
    })
    $(document).on("click","#arrow2", function(){
        shiftRight();
    })
}

function wrap(max, state, add){
    if(state+add>max){
        return(state+add-max)
    }
    else{
        return(state+add)
    }
}

function workEvent(work){
    
    $("#works"+work).mousedown(function(){
        var title= document.getElementById("pjname");
        if(this.style.minWidth=="5%"){
            if(workState){
                for(i=0;i<totalWorks;i++){
                    $("#works"+i).animate(
                        {"min-width":"5%"},
                        {duration:150,
                        easing:"linear"})
                }
            }

            $("#works"+work).animate(
                {"min-width":"85%"},
                {duration:300,
                easing:"swing"})
            
           
           title.style.color='rgb(0, 222, 255)';
           title.style.textDecoration='underline';
           title.style.cursor='pointer';
           title.innerHTML=projectName[work];
            
            workState=work+1;
        }

        else{
            for(i=0;i<totalWorks;i++){
                $("#works"+i).animate(
                    {"min-width":"5%"},
                    {duration:150,
                    easing:"linear"})
             }
             workState=0;
            title.style.color='rgb(255, 136, 0)';
            title.style.textDecoration='none';
            title.style.cursor='default';
            title.innerHTML='Past Works';
            
            
        }
    })
}

function titleClick(){
    $(document).on("click","#pjname",function(){
        if (this.innerHTML=="Past Works"){
            return
        }
        else{
        var popup = document.createElement('div');
        popup.className="popup";
        for(i=0;i<totalWorks;i++){
            if (this.innerHTML==projectName[i]){
                popup.innerHTML=pjHTML[i]
                document.getElementsByClassName("page")[1].appendChild(popup);
            }
        }
        
        }
    })
}
$(document).on("click","#exit",function(){
    var toDelete= this.parentNode
    toDelete.parentNode.removeChild(toDelete);
})

window.onload = function(){
    this.ArrowClick();
    this.checkHomeState();
    for(i=0;i<totalWorks;i++){
        document.getElementsByClassName("works")[i].style.minWidth="5%"
        this.workEvent(i);
    }
    this.titleClick();
}