
import swal from 'sweetalert';

export const Alert = (title,text,icon) => {
 
        swal({
        title: title,
        text: text,
        icon: icon,
        button: "متوجه شدم!",
      })
    }


    export const Confirm = (title,text) => {
      return swal({
        title,
        text,
        icon:"warning",
        buttons:["خیر","بله"],
        dangerMode:true
      })
    }