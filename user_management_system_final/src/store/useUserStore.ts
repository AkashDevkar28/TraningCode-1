import { create } from "zustand";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string; // Middle Name
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  address: string;
  country: string;
}

interface UserStore {
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
  genderFilter: string;
  addUser: (user: User) => string | null;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  deleteUser: (id: number) => void;
  deleteAllUsers: () => void;
  setUsers: (users: User[]) => void;
  setSearchQuery: (query: string) => void;
  setGenderFilter: (gender: string) => void;
  applyFilters: () => void;
}

const loadUsersFromStorage = (): User[] => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: loadUsersFromStorage(),
  filteredUsers: loadUsersFromStorage(),
  searchQuery: "",
  genderFilter: "",

  addUser: (user) => {
    const { users } = get();
    
    if (users.some((u) => u.username === user.username)) {
      return "Username already exists! Please choose another.";
    }
    if (users.some((u) => u.password === user.password)) {
      return "Password already in use! Please choose a different password.";
    }

    const newUsers = [...users, user];
    localStorage.setItem("users", JSON.stringify(newUsers));
    set({ users: newUsers, filteredUsers: newUsers });
    return null;
  },

  updateUser: (id, updatedUser) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers, filteredUsers: updatedUsers };
    });
  },

  deleteUser: (id) => {
    const { users } = get();
    const userToDelete = users.find((user) => user.id === id);
    if (!userToDelete) return;

    if (window.confirm(`Are you sure you want to delete ${userToDelete.firstName} ${userToDelete.lastName}?`)) {
      const updatedUsers = users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      set({ users: updatedUsers, filteredUsers: updatedUsers });
      alert(`${userToDelete.firstName} ${userToDelete.lastName} has been deleted.`);
    }
  },

  deleteAllUsers: () => {
    if (window.confirm("Are you sure you want to delete all users?")) {
      set({ users: [], filteredUsers: [] });
      localStorage.removeItem("users");
      requestAnimationFrame(() => alert("All users have been deleted."));
    }
  },

  setUsers: (users) => {
    localStorage.setItem("users", JSON.stringify(users));
    set({ users, filteredUsers: users });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setGenderFilter: (gender) => {
    set({ genderFilter: gender });
    get().applyFilters();
  },

  applyFilters: () => {
    const { users, searchQuery, genderFilter } = get();
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email} ${user.address} ${user.country}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }

    set({ filteredUsers: filtered });
  },
}));
