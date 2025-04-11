import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, TextField, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "./firebase";
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [oldLeads, setOldLeads] = useState<any[]>([]);
  const [realTimeLeads, setRealTimeLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOldLeads = async () => {
      const snapshot = await getDocs(collection(db, "leads"));
      const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOldLeads(leadsData);
    };

    fetchOldLeads();

    const unsubscribe = onSnapshot(collection(db, "leads"), snapshot => {
      const liveLeads = snapshot.docChanges()
        .filter(change => change.type === "added")
        .map(change => ({ id: change.doc.id, ...change.doc.data() }));

      if (liveLeads.length > 0) {
        setRealTimeLeads(prev => [...prev, ...liveLeads]);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteLead = async (id: string) => {
    await deleteDoc(doc(db, "leads", id));
    setOldLeads(prev => prev.filter(lead => lead.id !== id));
    setRealTimeLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const filteredOldLeads = oldLeads.filter(
    (lead) =>
      (lead.Name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (lead.Email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (lead.Phone || "").includes(search) ||
      (lead.Message?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const renderTable = (leads: any[]) => (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead, index) => (
            <TableRow key={index}>
              <TableCell sx={{ minWidth: 150 }}>{lead.Name}</TableCell>
              <TableCell sx={{ minWidth: 200 }}>{lead.Email}</TableCell>
              <TableCell sx={{ minWidth: 150 }}>{lead.Phone}</TableCell>
              <TableCell sx={{ minWidth: 300 }}>{lead.Message}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => deleteLead(lead.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Ops Center</Typography>

      <TextField
        label="Search leads"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box display="flex" justifyContent="space-between" gap={4}>
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>Legacy Data</Typography>
          {renderTable(filteredOldLeads)}
        </Box>

        <Box flex={1}>
          <Typography variant="h6" gutterBottom>Live Pulse</Typography>
          {renderTable(realTimeLeads)}
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
