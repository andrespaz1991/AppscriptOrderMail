function myFunction() {
limpiar(300,'trash'); // Borra el correo de la papelera despues de n días y el resto lo marca como leido
limpiar(8,'spam'); // Borra el correo spam despues de n días y el resto lo marca como leido
var etiquetas = ['LinkedIn','@SaneBlackHole','@SaneNews','@SaneNoReplies','andres.paz29@hotmail.com','LinkedIn','Computrabajo','Trabajo' ];
for (var i = 0; i < etiquetas.length; i++) {
limpiar_antiguios(etiquetas[i],1);
}
}

function limpiar(dias,criterio){
var hoy = new Date();
if(criterio=='trash'){
var threads = GmailApp.search("label:trash");
}
 if(criterio=='spam'){
var threads = GmailApp.search("label:spam");
} 

// Inicializa una variable para contar el número de correos 
var count = 0;
// Recorre los hilos
for (var i = 0; i < threads.length; i++) {
  // Obtiene los mensajes del hilo
  var messages = threads[i].getMessages();
  // Recorre los mensajes y los imprime
  for (var j = 0; j < messages.length; j++) {
    //Logger.log(messages[j].getSubject());
    var fechaMensaje = new Date(messages[j].getDate());
  //hoy.setDate(hoy.getDate() - dias);
   // Logger.log(hoy-fechaMensaje);
// Fecha inicial
var timeDiff = fechaMensaje.getTime() - hoy.getTime();
var daysDiff = timeDiff / (1000 * 3600 * 24);
  if (daysDiff < dias) {
  //Logger.log('mover a basurero');
  threads[i].moveToTrash()
} else if(daysDiff==dias){
}else {
  //Logger.log('marcar como leido');
  threads[i].markRead();
}
    count++;
  }
}
}


function limpiar_antiguios(etiqueta,dias){
var hoy = new Date();
var label = GmailApp.getUserLabelByName(etiqueta);
total=label.getThreads();
total=total.length;
if(total>0){
var threads = label.getThreads(0, total);
for (var i = 0; i < threads.length; i++) {
  message=threads[i].getMessages()[0];
  var fechaMensaje = new Date(message.getDate());
  var timeDiff = fechaMensaje.getTime() - hoy.getTime();
var daysDiff = timeDiff / (1000 * 3600 * 24);
  if (daysDiff < dias) {
 // Logger.log('mover a basurero');
  threads[i].moveToTrash()
} else if(daysDiff==dias){
}else {
  //Logger.log('marcar como leido');
  threads[i].markRead();
}
    //count++;
  }
}
}
