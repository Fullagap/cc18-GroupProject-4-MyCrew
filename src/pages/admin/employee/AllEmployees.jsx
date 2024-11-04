import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from "material-react-table";
import { LinearProgress, Box, Typography, IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import adminStore from '../../../store/admin-store';
import { editEmployeesInfo } from '../../../api/admin';
import { LuUserSquare2 } from "react-icons/lu";
import EditForm from './EditForm';
import { useNavigate } from 'react-router-dom';

const AllEmployees = () => {
    const {
        employeeInEachDepartment, positionInDepartment, employees, positions, departments,
        employeeDepartment, allEmployees, getAllEmployees
    } = adminStore();

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

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
            console.log(error);
        }
    };

    const handleInputChange = (name, value) => {
        setSelectedEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "departmentId") {
            positionInDepartment(value);
            employeeInEachDepartment(value);
        }
    };

    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id", size: 50 },
            { header: "First Name", accessorKey: "firstName", size: 120 },
            { header: "Last Name", accessorKey: "lastName", size: 120 },
            // { header: "Phone Number", accessorKey: "phoneNumber", size: 130, enableHiding: true },
            { header: "Department", accessorKey: "Department.departmentName", size: 150 },
            { header: "Position", accessorKey: "position.positionName", size: 150 },
            { header: "Salary", accessorKey: "salary", size: 180},
            {
                header: "Edit",
                Cell: ({ row }) => (
                    <IconButton onClick={() => handleEditClick(row.original)}>
                        <EditIcon />
                    </IconButton>
                ),
                size: 25,
            },
        ],
        []
    );

    return (
        <Box sx={{ position: 'relative', p: 2 }}>
            {loading && (
                <LinearProgress sx={{ position: 'absolute', top: 0, width: '100%' }} />
            )}

            {/* Header with icon and title */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <LuUserSquare2 style={{ fontSize: '24px', marginRight: '8px', color: '#3f51b5' }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                    All Employees List
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/admin/edit-employee')}
                sx={{ mb: 2, }}
            >
                Register New Employee
            </Button>
            <MaterialReactTable
                columns={columns}
                data={allEmployees || []}
                enableStickyHeader
                initialState={{
                    pagination: { pageSize: 10 },
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
                <EditForm
                    selectedEmployee={selectedEmployee}
                    departments={departments}
                    positions={positions}
                    employees={employees}
                    handleInputChange={handleInputChange}
                />
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