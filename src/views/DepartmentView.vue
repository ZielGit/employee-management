<script setup>

</script>

<template>
  <div class="container mt-4">
    <button class="btn btn-primary mb-2">Add Department</button>
    <div class="card">
        <div class="card-header">
            <h1>Department List</h1>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="department in departments" :key="department.id">
                            <td scope="row">{{ department.id }}</td>
                            <td>{{ department.name }}</td>
                            <td>
                                <!-- <router-link :to="{ name: 'departments.edit', params: { id: department.id } }" class="btn btn-warning me-1">Edit</router-link> -->
                                <!-- <Button type="button" danger @click="deletedepartment(department.id)">Delete</Button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>
