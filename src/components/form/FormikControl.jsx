
import React from 'react';
import File from './File';
import Input from './Input';
import Select from './Select';
import Switch from './Switch';
import Textarea from './Textarea';
import InputEnter from './InputEnter';
import MultiSelect from './MultiSelect';
import SearchableSelect  from './SearchableSelect';

const FormikControl = (props) => {
    switch (props.control) {
        case 'select':
            return <Select {...props}/>
        case 'input':
            return <Input {...props}/>
        case 'textarea':
            return <Textarea {...props}/>
        case 'file':
            return <File {...props}/>
        case 'switch':
            return <Switch {...props}/>
        case 'inputenter':
            return <InputEnter {...props}/>
        case 'multiSelect':
            return <MultiSelect {...props}/>
        case 'searchableselect':
            return <SearchableSelect {...props}/>
        default:
            return null
    }
}

export default FormikControl;