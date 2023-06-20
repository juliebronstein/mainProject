
import * as Yup from "yup";
import { addNewUserService, editUserService } from "../../services/users";
import { ConvertDateToMiladi } from "../../layouts/admin/utils/ConvertDate";
import { Alert } from "../../layouts/admin/utils/alert";

export const initialValues = {
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    birth_date: "",
    gender: 1,
    roles_id: []
};

export const onSubmit = async (values, actions, setData, selectedUserId,setSelectedRoles,setUserToEdit) => {
 
    values = {
        ...values,
        birth_date: values.birth_date ? ConvertDateToMiladi(values.birth_date) : null
    }
     console.log("values:",values)
    if (selectedUserId) {
        const res=await editUserService(selectedUserId,values)
        if(res.status===200){
            Alert('انجام شد', res.data.message, 'success')
            setData(old=>{
                const newData=[...old]
                const index=newData.findIndex(i=>i.id==selectedUserId)
                newData[index]= res.data.data
                return newData
            })
        }
    }else{
        const res = await addNewUserService(values)
        console.log("res:",res)
        if (res.status == 201) {
            Alert('انجام شد', res.data.message, 'success')
            actions.resetForm();
            setData(old=>[...old, res.data.data])
            setSelectedRoles([])
            setUserToEdit(null)
        }else{
            console.log("res.data",res.data)
        }
    } 
};

export const validationSchema = Yup.object().shape({
    user_name : Yup.string().required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    first_name : Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    last_name : Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    password : Yup.string().when("isEditing",{
        is:true,
        then:Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        otherwise:Yup.string()
    .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود")
    }),
    
    
    
        phone : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    email : Yup.string().email("لطفا فرمت ایمیل را رعایت کنید"),
    birth_date : Yup.string().matches(/^[0-9/\ \s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    gender : Yup.number(),
    roles_id : Yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
})