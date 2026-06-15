'use client';
import { useEffect, useState } from 'react';
import { 
  Search, Home, Users, Calendar, MessageCircle, CreditCard, 
  Settings, MoreVertical, Download, Phone, ShieldCheck 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [jessica, setJessica] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa('coalition:skills-test');
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        });
        const data = await response.json();
        setPatients(data);
        const jt = data.find(p => p.name === 'Jessica Taylor');
        setJessica(jt);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading...</div>;
  if (!jessica) return <div style={{padding: '40px', textAlign: 'center'}}>Data not found</div>;

  // Chart Data preparation
  const chartData = [...jessica.diagnosis_history].slice(0, 6).reverse();
  const labels = chartData.map(d => `${d.month.slice(0, 3)}, ${d.year}`);
  const systolicData = chartData.map(d => d.blood_pressure.systolic.value);
  const diastolicData = chartData.map(d => d.blood_pressure.diastolic.value);

  const bpData = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        min: 60,
        max: 180,
      }
    }
  };

  // Format Date Function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const latestStats = jessica.diagnosis_history[0];

  return (
    <>
      <header className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.svg" alt="Tech.Care" style={{ height: '36px', display: 'none' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Tech.Care</h1>
        </div>
        
        <nav className="nav-links">
          <div className="nav-item"><Home size={18} /> Overview</div>
          <div className="nav-item active"><Users size={18} /> Patients</div>
          <div className="nav-item"><Calendar size={18} /> Schedule</div>
          <div className="nav-item"><MessageCircle size={18} /> Message</div>
          <div className="nav-item"><CreditCard size={18} /> Transactions</div>
        </nav>

        <div className="nav-profile">
          <img src="https://fedskillstest.ct.digital/4.png" alt="Dr. Jose Simmons" />
          <div className="nav-profile-info">
            <span>Dr. Jose Simmons</span>
            <small>General Practitioner</small>
          </div>
          <div className="nav-profile-actions">
            <button className="icon-btn"><Settings size={20} /></button>
            <button className="icon-btn"><MoreVertical size={20} /></button>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Left Sidebar: Patients List */}
        <aside className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px' }}>
            <div className="patient-list-header">
              <h2>Patients</h2>
              <Search size={20} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {patients.map(p => (
                <div key={p.name} className={`patient-item ${p.name === 'Jessica Taylor' ? 'active' : ''}`}>
                  <div className="patient-item-content">
                    <img src={p.profile_picture} alt={p.name} />
                    <div className="patient-info">
                      <span className="name">{p.name}</span>
                      <span className="details">{p.gender}, {p.age}</span>
                    </div>
                  </div>
                  <MoreVertical size={20} style={{ color: 'var(--text-secondary)' }} />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content: Dashboard */}
        <div className="dashboard-main">
          <section className="card diagnosis-history">
            <h2>Diagnosis History</h2>
            
            <div className="chart-container">
              <div className="chart-area" style={{ height: '250px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Blood Pressure</h3>
                  <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Last 6 months <span style={{ fontSize: '10px' }}>▼</span>
                  </div>
                </div>
                <div style={{ height: '200px' }}>
                  <Line data={bpData} options={chartOptions} />
                </div>
              </div>
              
              <div className="chart-stats">
                <div className="stat-item">
                  <div className="label systolic">Systolic</div>
                  <div className="value">{latestStats.blood_pressure.systolic.value}</div>
                  <div className="status">▲ {latestStats.blood_pressure.systolic.levels}</div>
                </div>
                <div style={{ borderTop: '1px solid #CBC8D4', margin: '8px 0' }}></div>
                <div className="stat-item">
                  <div className="label diastolic">Diastolic</div>
                  <div className="value">{latestStats.blood_pressure.diastolic.value}</div>
                  <div className="status">▼ {latestStats.blood_pressure.diastolic.levels}</div>
                </div>
              </div>
            </div>

            <div className="vital-cards">
              <div className="vital-card respiratory">
                <div style={{ backgroundColor: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px' }}>🫁</span>
                </div>
                <div className="info">
                  <span className="label">Respiratory Rate</span>
                  <span className="value">{latestStats.respiratory_rate.value} bpm</span>
                  <span className="status">{latestStats.respiratory_rate.levels}</span>
                </div>
              </div>

              <div className="vital-card temperature">
                <div style={{ backgroundColor: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px' }}>🌡️</span>
                </div>
                <div className="info">
                  <span className="label">Temperature</span>
                  <span className="value">{latestStats.temperature.value}°F</span>
                  <span className="status">{latestStats.temperature.levels}</span>
                </div>
              </div>

              <div className="vital-card heartrate">
                <div style={{ backgroundColor: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px' }}>❤️</span>
                </div>
                <div className="info">
                  <span className="label">Heart Rate</span>
                  <span className="value">{latestStats.heart_rate.value} bpm</span>
                  <span className="status">▼ {latestStats.heart_rate.levels}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="card diagnostic-list">
            <h2>Diagnostic List</h2>
            <table>
              <thead>
                <tr>
                  <th>Problem/Diagnosis</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jessica.diagnostic_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Right Sidebar: Profile */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="card profile-sidebar">
            <img src={jessica.profile_picture} alt={jessica.name} />
            <h2>{jessica.name}</h2>
            
            <div className="profile-details">
              <div className="profile-item">
                <div className="profile-item-icon"><Calendar size={20} /></div>
                <div className="profile-item-info">
                  <span className="label">Date Of Birth</span>
                  <span className="value">{formatDate(jessica.date_of_birth)}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="profile-item-icon">
                  <span style={{fontWeight: 'bold'}}>♀</span>
                </div>
                <div className="profile-item-info">
                  <span className="label">Gender</span>
                  <span className="value">{jessica.gender}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="profile-item-icon"><Phone size={20} /></div>
                <div className="profile-item-info">
                  <span className="label">Contact Info.</span>
                  <span className="value">{jessica.phone_number}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="profile-item-icon"><Phone size={20} /></div>
                <div className="profile-item-info">
                  <span className="label">Emergency Contacts</span>
                  <span className="value">{jessica.emergency_contact}</span>
                </div>
              </div>

              <div className="profile-item">
                <div className="profile-item-icon"><ShieldCheck size={20} /></div>
                <div className="profile-item-info">
                  <span className="label">Insurance Provider</span>
                  <span className="value">{jessica.insurance_type}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ marginTop: '16px' }}>Show All Information</button>
          </div>

          <div className="card lab-results">
            <h2>Lab Results</h2>
            <div className="lab-results-list">
              {jessica.lab_results.map((result, index) => (
                <div key={index} className="lab-result-item">
                  <span>{result}</span>
                  <button><Download size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
