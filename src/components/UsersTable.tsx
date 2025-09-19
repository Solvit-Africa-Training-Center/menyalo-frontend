import type { UserstableType } from '../types/userstabletypes';
import profile from '../assets/profile.jpg';

const users: UserstableType[] = [
  {
    usernames: 'John Doe',
    emails: 'john@gmail.com',
    roles: 'user',
    avatar: profile,
    status: 'Active',
    createdAt: '2 hour ago',
    action: '...',
  },
  {
    usernames: 'Jane smith',
    emails: 'jane1@gmail.com',
    roles: 'Lawyer',
    avatar: profile,
    status: 'Active',
    createdAt: '1day ago',
    action: '...',
  },
  {
    usernames: 'Mike Loe',
    emails: 'mike1@gmail.com',
    roles: 'Firm',
    avatar: profile,
    status: 'Inactive',
    createdAt: '1 week ago',
    action: '...',
  },
  {
    usernames: 'Emmy vote',
    emails: 'votee@gmail.com',
    roles: 'user',
    avatar: profile,
    status: 'Active',
    createdAt: 'Never',
    action: '...',
  },
];

export default function UsersTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-custom-200 w-full">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-gray-600 text-sm font-semibold border-b border-custom-200">
            <th className="py-3 px-4">user</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Last Login</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx} className="border-b border-custom-100 hover:bg-custom-50 transition">
              <td className="py-3 px-4 flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt={u.usernames}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-[color:var(--color-primary-800)]">
                    {u.usernames}
                  </div>
                  <div className="text-xs text-gray-500">{u.emails}</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="px-3 py-1 rounded-full bg-custom-100 text-xs text-gray-700 border border-custom-200">
                  {u.roles}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.status === 'Active'
                      ? 'bg-[color:var(--color-primary-800)] text-white'
                      : 'bg-custom-200 text-gray-600'
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600 text-sm">{u.createdAt}</td>
              <td className="py-3 px-4 text-xl text-gray-400 cursor-pointer">{u.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}