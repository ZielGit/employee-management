<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const photoPath = import.meta.env.VITE_PHOTO_URL;
const employees = ref([]);
const dialog = ref(false)
const confirmationDialog = ref(false)
const modalTitle = ref('');
const EmployeeId = ref(0);
const EmployeeName = ref('');
const DateOfJoining = ref('');
const PhotoFileName = ref('');
const employeeToDelete = ref(null);

onMounted(async () => {
    await fetchEmployees();
});

function addClick() {
    modalTitle.value = "Add Employee";
    EmployeeId.value = 0;
    EmployeeName.value = "";
    DateOfJoining.value = "";
    PhotoFileName.value = "default.png";
    dialog.value = true
}

function editClick(employee) {
    modalTitle.value = "Edit Employee";
    EmployeeId.value = employee.id;
    EmployeeName.value = employee.EmployeeName;

    const dateOfBirth = new Date(employee.DateOfJoining);
    const year = dateOfBirth.getFullYear();
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOfBirth.getDate().toString().padStart(2, '0');

    const formattedDateOfBirth = `${year}-${month}-${day}`;
    DateOfJoining.value = formattedDateOfBirth;

    PhotoFileName.value = employee.PhotoFileName;
    dialog.value = true
}

async function imageUpload(event) {
    try {
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        const response = await axios.post(`${apiUrl}/employee/save-file`, formData);
        PhotoFileName.value = response.data.file_name
    } catch (error) {
        console.error(error);
    }
}

async function createClick() {
    try {
        await axios.post(`${apiUrl}/employee/create`, {
            EmployeeName: EmployeeName.value,
            DateOfJoining: DateOfJoining.value,
            PhotoFileName: PhotoFileName.value
        });
        await fetchEmployees();
        alert("Employee created successfully");
        dialog.value = false
    } catch (error) {
        console.error(error);
    }
}

async function updateClick() {
    try {
        await axios.put(`${apiUrl}/employee/update/${EmployeeId.value}`, {
            EmployeeName: EmployeeName.value,
            DateOfJoining: DateOfJoining.value,
            PhotoFileName: PhotoFileName.value
        });
        await fetchEmployees();
        alert("Employee updated successfully");
        dialog.value = false
    } catch (error) {
        console.error(error);
    }
}

const fetchEmployees = async () => {
    try {
        const response = await axios.get(`${apiUrl}/employee/list`);
        employees.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteEmployee = async (id) => {
    try {
        await axios.delete(`${apiUrl}/employee/delete/${id}`);
        await fetchEmployees();
    } catch (error) {
        console.error(error);
    }
};

function openDeleteDialog(id) {
    employeeToDelete.value = id;
    confirmationDialog.value = true;
}
</script>

<template>
    <v-btn prepend-icon="$plus" color="indigo-accent-4" @click="addClick()">
        Add Employee
    </v-btn>

    <h1>Employee List</h1>

    <v-table striped="even">
        <thead>
            <tr>
                <th class="text-left">
                    ID
                </th>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Date Of Joining
                </th>
                <th class="text-left">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.id }}</td>
                <td>{{ employee.EmployeeName }}</td>
                <td>{{ employee.DateOfJoining }}</td>
                <td>
                    <v-btn class="ma-2" color="yellow-darken-1" @click="editClick(employee)">
                        Edit
                    </v-btn>
                    <v-btn color="red-darken-1" @click="openDeleteDialog(employee.id)">
                        Delete
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>

    <v-dialog v-model="dialog" max-width="500">
        <v-card :title="modalTitle">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="EmployeeName" label="Employee Name" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="DateOfJoining" label="Date Of Joining" type="date"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input label="File input" @change="imageUpload"></v-file-input>
                    </v-col>
                    <v-col cols="12">
                        <img width="250px" height="250px" :src="photoPath + '/' + PhotoFileName" />
                    </v-col>
                </v-row>
            </v-container>

            <template v-slot:actions>
                <v-btn text="Close" @click="dialog = false">Close</v-btn>

                <v-spacer></v-spacer>

                <v-btn @click="createClick" v-if="EmployeeId == 0">
                    Create
                </v-btn>
                <v-btn @click="updateClick" v-if="EmployeeId != 0">
                    Update
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmationDialog" width="auto">
        <v-card max-width="400" text="You won't be able to revert this!." title="Are you sure?">
            <template v-slot:actions>
                <v-btn text="Close" @click="confirmationDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ms-auto" text="Yes"
                    @click="deleteEmployee(employeeToDelete); confirmationDialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
