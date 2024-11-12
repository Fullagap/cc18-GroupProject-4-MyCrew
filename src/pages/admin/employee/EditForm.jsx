import React from 'react';
import { DialogContent, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

function EditForm({ selectedEmployee, departments, positions, employees, handleInputChange }) {



  return (
    <div>
      <DialogContent>
        {selectedEmployee && (
          <>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </Typography>
            <TextField
              margin="dense"
              label="e-mail"
              type="text"
              fullWidth
              value={selectedEmployee.email}
              onChange={(e) => handleInputChange("email", e.target.value)} 
            />
            <TextField
              margin="dense"
              label="Phone Number"
              type="text"
              fullWidth
              value={selectedEmployee.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)} 
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedEmployee.departmentId || ""}
                onChange={(e) => handleInputChange("departmentId", e.target.value)} 
                label="Department"
              >
                {departments.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Position</InputLabel>
              <Select
                value={selectedEmployee.positionId || ""}
                onChange={(e) => handleInputChange("positionId", e.target.value)} 
                label="Position"
              >
                {positions.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.positionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {
              selectedEmployee.id !== 1 && 
              <FormControl fullWidth margin="dense">
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={selectedEmployee.supId || ""}
                onChange={(e) => handleInputChange("supId", e.target.value)} 
              >
                {employees.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    [{el.position.positionName}] {el.firstName} {el.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            }
           
            <TextField
              margin="dense"
              label="Personal Leave"
              type="number"
              fullWidth
              value={selectedEmployee.personalLeaveAmount}
              onChange={(e) => handleInputChange("personalLeaveAmount", e.target.value)} 
            />
            <TextField
              margin="dense"
              label="Sick Leave"
              type="number"
              fullWidth
              value={selectedEmployee.sickLeaveAmount}
              onChange={(e) => handleInputChange("sickLeaveAmount", e.target.value)}
            />
            <TextField
              margin="dense"
              label="Annual Leave"
              type="number"
              fullWidth
              value={selectedEmployee.annualLeaveAmount}
              onChange={(e) => handleInputChange("annualLeaveAmount", e.target.value)} 
            />
            <TextField
              margin="dense"
              label="Salary"
              type="number"
              fullWidth
              value={selectedEmployee.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)} 
            />
          </>
        )}
      </DialogContent>
    </div>
  );
}

export default EditForm;
