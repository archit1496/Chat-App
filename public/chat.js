//makeconnection
var socket=io.connect('http://localhost:4000');
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


//emitevent

btn.addEventListener('click',function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
})
message.addEventListener('keydown',function(){
    socket.emit('typing',{
        handle:handle.value,
    });
})
message.addEventListener('keyup',function(){
    socket.emit('stoptyping',{
        handle:handle.value,
    });
})

//listen for event
socket.on('chat',function(data){
    
    output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'<p>';
})

socket.on('typing', function(data){
    
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message...</em></p>';
    
})
var cleartimeout;
socket.on('stoptyping',function(data){
    window.clearTimeout(cleartimeout);
    cleartimeout=setTimeout(() => {
        feedback.innerHTML="";  
    }, 1000);
    
})