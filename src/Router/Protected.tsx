import{ useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
const Protected = (props:any) => {
    const { Component } = props;
    const Navigate = useNavigate();
    const {isRender} = useContext(DataContext)
    let login = sessionStorage.getItem('token');
    
    useEffect(() => {
        if (!login) {
            Navigate('/')
        }
        // eslint-disable-next-line
    }, [isRender,login]);

    return (
        <Component />
    )
}

export default Protected