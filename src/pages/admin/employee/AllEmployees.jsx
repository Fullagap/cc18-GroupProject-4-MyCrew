import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from "material-react-table";
import { LinearProgress, Box, Typography, IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import adminStore from '../../../store/admin-store';
import { editEmployeesInfo } from '../../../api/admin';
import { LuUserSquare2 } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import EditForm from './EditForm';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stroes/authSrore';

const AllEmployees = () => {
    const {
        employeeInEachDepartment, positionInDepartment, employees, positions, departments,
        employeeDepartment, allEmployees, getAllEmployees
    } = adminStore();

    const token = useAuthStore((state)=>state.token)

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getAllEmployees(token);
            await employeeDepartment(token);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setOpenModal(true);

        if (employee.departmentId) {
            positionInDepartment(employee.departmentId,token);
            employeeInEachDepartment(employee.departmentId,token);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEmployee(null);
    };

    const handleSaveChanges = async () => {
        try {
            const resp = await editEmployeesInfo(selectedEmployee.id, selectedEmployee,token);
            console.log(resp);
            await getAllEmployees(token);
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
            positionInDepartment(value,token);
            employeeInEachDepartment(value,token);
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
            { header: "Salary", accessorKey: "salary", size: 180 },
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
                <LuUserSquare2 style={{ fontSize: '35px', marginRight: '8px', color: '#3f51b5', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                    All Employees List
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/admin/edit-employee')}
                    sx={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}
                >
                    <CiCirclePlus style={{ fontSize: '2.5em', marginRight: '0.2em', color: 'inherit' }} />
                    Add New Employee
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/admin/update-department')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '15px',
                        backgroundColor: '#03AC13',
                        '&:hover': {
                            backgroundColor: 'darkgreen'
                        },
                    }}
                >
                    <FaRegEdit  style={{ fontSize: '2em', marginRight: '0.2em', color: 'inherit' }} />
                    Manage Department
                </Button>
            </Box>


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
