import{ useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
const UserProtected = (props:any) => {
    const { Component } = props;
    const Navigate = useNavigate();
    const {isRender} = useContext(DataContext)
    let user:any = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}');
    let login = sessionStorage.getItem('token');
    useEffect(() => {
        if (user.role ==='BUYER' || !login) {
            Navigate('/')
        }
        // eslint-disable-next-line
    }, [isRender,user,login]);

    return (
        <Component />
    )
}

export default UserProtected