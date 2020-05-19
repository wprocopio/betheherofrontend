import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile() {

  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongname = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
      toast.error("registro deletado com Sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => { setIncidents(response.data) })
  }, [ongId]);
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The hero" />
        <span>Bem vinda {ongname}</span>
        <Link className="button" to="/incidents/new" > Cadastrar Novo Caso</Link>
        <button onClick={handleLogout}
          type="button"> <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.valor)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
            <ToastContainer />
          </li>
        ))}
      </ul>
    </div>
  );
}