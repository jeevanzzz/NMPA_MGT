import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, Plus, MoreVertical, CheckCircle, XCircle, Mail, Briefcase, Building, X, ShieldAlert } from 'lucide-react';
import { users as initialUsers } from '../data/mockData';

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const department = formData.get('department') as string;

    if (editingUserId !== null) {
      // Edit User
      setUsers(users.map(u => u.id === editingUserId ? { ...u, name, email, role, department } : u));
    } else {
      // Add User
      const newUser = {
        id: Date.now(),
        name,
        email,
        role,
        department,
        status: 'active',
        lastLogin: new Date().toISOString()
      };
      setUsers([newUser, ...users]);
    }
    
    setIsAddUserModalOpen(false);
    setEditingUserId(null);
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const deleteUser = (id: number) => {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const openEditModal = (user: typeof users[0]) => {
    setEditingUserId(user.id);
    setIsAddUserModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">System User Roles</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage port access control, system roles, and account security
          </p>
        </div>
        <button onClick={() => { setEditingUserId(null); setIsAddUserModalOpen(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-colors shadow-sm font-bold text-sm uppercase tracking-wide">
          <Plus className="w-4 h-4" />
          <span>Provision User</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-sm shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search accounts by name, email, or security role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900 dark:text-white font-medium"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white dark:bg-slate-800 rounded-sm shadow-sm p-6 border ${user.status === 'active' ? 'border-slate-200 dark:border-slate-700' : 'border-red-200 dark:border-red-800/50 bg-red-50/30'} hover:shadow-md transition-shadow relative group`}
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-sm shadow-sm border border-slate-200 dark:border-slate-600">
              <button onClick={() => openEditModal(user)} className="text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-1 uppercase tracking-wide">Edit</button>
              <button onClick={() => toggleUserStatus(user.id)} className={`text-xs font-bold px-2 py-1 uppercase tracking-wide ${user.status === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-emerald-600 hover:text-emerald-800'}`}>
                {user.status === 'active' ? 'Suspend' : 'Activate'}
              </button>
              <button onClick={() => deleteUser(user.id)} className="text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1 uppercase tracking-wide">Del</button>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-white text-lg font-bold shadow-sm ${user.status === 'active' ? 'bg-gradient-to-br from-blue-600 to-cyan-500' : 'bg-red-500'}`}>
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">{user.name}</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3" /> {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> ROLE</span>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{user.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> DEPT</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{user.department}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                {user.status === 'active' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  user.status === 'active' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                }`}>
                  {user.status === 'active' ? 'Active Auth' : 'Suspended'}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                LOGIN: {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
        {filteredUsers.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-sm shadow-sm border border-slate-200 dark:border-slate-700">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No accounts found matching your query.</p>
          </div>
        )}
      </div>

      {/* Add / Edit User Modal */}
      <AnimatePresence>
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-sm shadow-2xl w-full max-w-md overflow-hidden flex flex-col my-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shrink-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-blue-600" /> {editingUserId ? 'Modify User Access' : 'Provision New User'}
                </h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <form id="userForm" onSubmit={handleAddOrEditUser} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" name="name" required defaultValue={editingUserId ? users.find(u => u.id === editingUserId)?.name : ''} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" name="email" required defaultValue={editingUserId ? users.find(u => u.id === editingUserId)?.email : ''} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Security Role</label>
                    <select name="role" required defaultValue={editingUserId ? users.find(u => u.id === editingUserId)?.role : 'Dock Manager'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="Super Admin">Super Admin</option>
                      <option value="Port Authority Admin">Port Authority Admin</option>
                      <option value="Dock Manager">Dock Manager</option>
                      <option value="Cargo Manager">Cargo Manager</option>
                      <option value="Ship Operator">Ship Operator</option>
                      <option value="Analytics Officer">Analytics Officer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Department</label>
                    <select name="department" required defaultValue={editingUserId ? users.find(u => u.id === editingUserId)?.department : 'Operations'} className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm focus:ring-1 focus:ring-blue-600 outline-none text-sm font-semibold">
                      <option value="Operations">Operations</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Administration">Administration</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 hover:text-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="userForm" className="px-6 py-2.5 bg-blue-700 text-white text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-blue-800 shadow-sm transition-colors">
                  {editingUserId ? 'Save Changes' : 'Provision Access'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
