import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, Drawer, Grid, Fade
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

const dummyDataBar = [
  { month: 'Jan', leads: 400 },
  { month: 'Dec', leads: 765 },
  { month: 'Oct', leads: 149 },
];

const dummyDataPie = [
  { name: 'Nov', value: 309 },
  { name: 'Feb', value: 515 },
  { name: 'Sep', value: 2200 },
];

const dummyDataLine = [
  { day: '11 Feb', leads: 500 },
  { day: '25 Feb', leads: 190 },
  { day: '10 Mar', leads: 250 },
  { day: '25 Mar', leads: 409 },
  { day: '15 Apr', leads: 610 },
  { day: '30 Apr', leads: 890 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const csvData = [
  ['Month', 'Leads'],
  ...dummyDataBar.map(item => [item.month, item.leads]),
];

const Home: React.FC = () => {
  const [isSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        PaperProps={{
          sx: {
            width: 300,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            borderRight: '2px solid #1976d2',
            color: 'white',
            borderRadius: '0 10px 10px 0',
          }
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Lead Statistics</Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Leads/Month</Typography>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={dummyDataBar}>
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Conversion % /Month</Typography>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={dummyDataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
                  {dummyDataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Daily Lead Trend</Typography>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={dummyDataLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ mt: 3 }}>
            <CSVLink data={csvData} filename="dummy_leads_summary.csv" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="outlined" color="primary">Export to CSV</Button>
            </CSVLink>
          </Box>
        </Box>
      </Drawer>

      {/* Main Area */}
      <Box sx={{ flex: 1, p: 4, color: 'white', display: 'flex', flexDirection: 'column' }}>
        <Fade in timeout={1000}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">Welcome To Funnelist</Typography>
            <Typography sx={{ mt: 2, color: '#ffffffcc' }}>
              The sidebar can be used to explore statistics, view trends, and export summaries.
            </Typography>

            <Grid container spacing={3} mt={4}>
              <Grid item xs={12} md={4}>
                <Paper elevation={6} sx={{ p: 3, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
                  <Typography>Lead Count</Typography>
                  <Typography variant="h4" fontWeight="bold">235</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={6} sx={{ p: 3, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
                  <Typography>Response Latency</Typography>
                  <Typography variant="h4" fontWeight="bold">2.5 hrs</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={6} sx={{ p: 3, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
                  <Typography>Turnaround</Typography>
                  <Typography variant="h4" fontWeight="bold">18%</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={6} display="flex" justifyContent="center" gap={2}>
              <Button variant="contained" color="primary" onClick={() => navigate('/contact')} sx={{ borderRadius: 4, boxShadow: 3 }}>📥 Connect With Funnelist</Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/admin')} sx={{ borderRadius: 4, boxShadow: 3 }}>📑 Engangement Feed</Button>
            </Box>

            <Box mt={8} textAlign="right" pr={6}>
              <Typography variant="h5" gutterBottom>Mission Brief</Typography>
              <Typography variant="body1" sx={{ color: '#ffffffcc', maxWidth: 450, float: 'right' }}>
                Funnelist was born with one vision which was to simplify lead generation and help dealerships thrive in a fast paced and competitive market, With real-time data updates, responsive design and intelligent analytics due to which Funnelist empowers dealerships to nurture every oppertunity which results in transforming interests into conversions and clicks into loyal customers. Welcome to the future of smarter selling, Welcome to Funnelist.
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default Home;
