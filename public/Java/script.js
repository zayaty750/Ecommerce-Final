
window.addEventListener("load", function(){
    document.getElementById("preloading").style.display = "none";
    document.body.style.overflow = "none";
})

  function change_heart(heart)
  {
    if(heart.className != "fa-solid fa-heart")
    {
      heart.style.color ="#ff0000";
      heart.className = "fa-solid fa-heart";
    }
    else 
    {
      heart.style.color ="black";
      heart.className = "bi-heart";
    }
  } 
  
  First_container_width =  325*4;
  let first_slider =0;
  let clicks = 0;
  let current_slider;
 function slider_to_right(product_slider)
  {
    if(first_slider == 0 || current_slider == document.getElementById(product_slider.id))
    {
      if(clicks < 2)
      {
      clicks ++;
      if(clicks == 1)
      {
        product_slider.scrollLeft = First_container_width;    
      } 
      else if(clicks == 2)
      {
        product_slider.scrollLeft = First_container_width*2 ;  
      } 
      else if(clicks == 3)
      {
        product_slider.scrollLeft = First_container_width*3;  
      } 

      // condition byda5alny 3ala l if 3altol 3ashan asgl awl container 
      first_slider ++;
      //a5er container kont feh
      current_slider = document.getElementById(product_slider.id);
    }
    }
    else
    { 
      
      first_slider=0;
      clicks = 0;

      clicks ++;
      if(clicks == 1)
      {
        product_slider.scrollLeft = First_container_width ;    
      } 
      else if(clicks == 2)
      {
        product_slider.scrollLeft = First_container_width*2 ;  
      } 
      else if(clicks == 3)
      {
        product_slider.scrollLeft = First_container_width*3 ;  
      } 
      else if(clicks == 4)
      {
        product_slider.scrollLeft = First_container_width*4 ;  
      } 
      current_slider.scrollLeft = 0;
      console.log("current_slider:- "+current_slider+"first_slider:- "+first_slider +"  "+clicks);
    }
    
 
  }
 
 function slider_to_left(product_slider)
  {
    if( current_slider == document.getElementById(product_slider.id))
    {
      if(clicks > 0)
      {
      clicks --;
      if(clicks == 0)
      {
        product_slider.scrollLeft = 0;    
      } 
      else if(clicks == 1)
      {
        product_slider.scrollLeft = First_container_width ;  
      } 
      else if(clicks == 2)
      {
        product_slider.scrollLeft = First_container_width*2;  
      } 
      else if(clicks == 3)
      {
        product_slider.scrollLeft = First_container_width*3;  
      } 
    }
    }

  }

  function openNav() 
  {
    document.getElementById("mySidenav").style.height = "100%";
    document.body.style.overflowY = "hidden";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.height = "0%";
    document.body.style.overflowY = "visible";
  }

function open_search()
{
  document.getElementById("search_nav").style.height = "100%";
  document.body.style.overflow = "hidden";

}
function close_search()
{
  document.getElementById("search_nav").style.height = "0px";
  document.body.style.overflowY = "visible";
}


function topFunction() {
  document.documentElement.scrollTop = 0;
}

window.onscroll = function() {when_scroll()};

function when_scroll() {
  if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
    document.getElementById("top_function_button").style.display = "block";
  } else {
    document.getElementById("top_function_button").style.display = "none";
  }
}

function show_()
{
    document.getElementById("login").style.display = "block";
    document.getElementById("Register").style.display = "none";
}
function show_Signin()
{
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "block";
}