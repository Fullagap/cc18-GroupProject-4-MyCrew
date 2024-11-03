import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from "material-react-table";
import { LinearProgress, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import adminStore from '../../../store/admin-store';
import { editEmployeesInfo } from '../../../api/admin';
import EditForm from './EditForm';

const AllEmployees = () => {
    const getAllEmployees = adminStore((state) => state.getAllEmployees);
    const allEmployees = adminStore((state) => state.allEmployees);
    const employeeDepartment = adminStore((state) => state.employeeDepartment);
    const departments = adminStore((state) => state.departments);
    const positions = adminStore((state) => state.positions);
    const employees = adminStore((state) => state.employees);
    const positionInDepartment = adminStore((state) => state.positionInDepartment);
    const employeeInEachDepartment = adminStore((state) => state.employeeInEachDepartment);

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getAllEmployees();
            await employeeDepartment();
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setOpenModal(true);

        // Load positions and supervisors for the selected department
        if (employee.departmentId) {
            positionInDepartment(employee.departmentId);
            employeeInEachDepartment(employee.departmentId);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEmployee(null);
    };

    const handleSaveChanges = async () => {
        try {
            const resp = await editEmployeesInfo(selectedEmployee.id, selectedEmployee);
            console.log(resp);
            await getAllEmployees();
            setOpenModal(false);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleInputChange = (field, value) => {
        setSelectedEmployee((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "departmentId") {
            positionInDepartment(value);
            employeeInEachDepartment(value);
        }
    };

    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id", size: 50 },
            { header: "First Name", accessorKey: "firstName", size: 120 },
            { header: "Last Name", accessorKey: "lastName", size: 120 },
            { header: "Email", accessorKey: "email", size: 200, enableHiding: true },
            { header: "Phone Number", accessorKey: "phoneNumber", size: 130, enableHiding: true },
            { header: "Department", accessorKey: "Department.departmentName", size: 150 },
            { header: "Position", accessorKey: "position.positionName", size: 150 },
            {
                header: "Actions",
                Cell: ({ row }) => (
                    <IconButton onClick={() => handleEditClick(row.original)}>
                        <EditIcon />
                    </IconButton>
                ),
                size: 50,
            },
        ],
        []
    );

    return (
        <Box sx={{ position: 'relative' }}>
            {loading && (
                <LinearProgress sx={{ position: 'absolute', top: 0, width: '100%' }} />
            )}
            <MaterialReactTable
                columns={columns}
                data={allEmployees || []}
                enableStickyHeader
                initialState={{
                    pagination: { pageSize: allEmployees.length || 10 },
                }}
                muiTableContainerProps={{
                    sx: { overflowX: 'auto' },
                }}
            />
            {!loading && allEmployees?.length === 0 && (
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    No employees found.
                </Typography>
            )}

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Edit Employee</DialogTitle>
                <EditForm  selectedEmployee={selectedEmployee} departments={departments} positions={positions} employees={employees} handleInputChange={handleInputChange}/>

                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllEmployees;
