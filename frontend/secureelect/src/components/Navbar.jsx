<Routes>
      Public Routes
      <Route path='/' element={<Login/>} />

      {/*Admin Routes*/}
      <Route 
        path='/admin/dashboard' 
        element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }/>

      {/*User Routes*/}
      <Route 
        path='/user/dashboard' 
        element={
          <ProtectedRoute>
            <UserDashboard/>
          </ProtectedRoute>
        }/>

    </Routes>