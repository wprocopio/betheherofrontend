import React ,  { useState } from 'react'
import { Link , useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NewIncident() {
  const history = useHistory();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [valor, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();
    
    const data = {
      title,
      description,
      valor,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })            
      history.push('/profile');
    } catch (err) {
      //alert('Erro ao cadastrar caso, tente novamente.');
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar o heroi para rewsolver isso.</p>
          
          <Link classname="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident} >
          <input     
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titulo do caso"/>
          <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)} 
          placeholder="Descrição"/>
          <input
          value={valor}
          onChange={e => setValue(e.target.value)}     
          placeholder="Valor em reais"/>
          
          <button className="button" type="submit">
            Cadastrar
          </button>
          <ToastContainer />
        </form>

      </div>
    </div>
  );
}