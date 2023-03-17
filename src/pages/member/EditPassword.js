import Title from 'antd/es/skeleton/Title';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/apiurl';

const EditPassword = () => {
    const userid = useSelector(state=>state.logincheck.updateId);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        m_pass:"",
        m_passch:"",
        m_email:userid
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        //get()-->게시글 항목이나 내용 조회할때 씀
        //post()-->데이터 삽입(입력), put()-->데이터 업데이트 patch()-->데이터 일부를 업데이트, 
        e.preventDefault();
        if(formData.m_pass === formData.m_passch){
            axios.patch(`${API_URL}/updatePw`, formData)
            .then(res=>{
                if(res.data){
                    alert('패스워드가 변경되었습니다.');
                    navigate('/login');
                }
            })
            .catch(e=>{
                console.log(e)
            })
        }else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }
    return (
        <div className='inner' id='login'>
            <Title title="Update password"/>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name='m_pass' 
                            value={formData.m_pass} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>비밀번호확인</td>
                            <td><input type="password" name='m_passch' 
                            value={formData.m_passch} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit'>변경</button>
                                <button type='reset'>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default EditPassword;