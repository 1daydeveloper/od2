"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, Calendar, MapPin, Trash2 } from "lucide-react";

const ExpenseTracker = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isAddTripOpen, setIsAddTripOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('od2-trips');
    const savedExpenses = localStorage.getItem('od2-expenses');
    
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save data to localStorage whenever trips or expenses change
  useEffect(() => {
    localStorage.setItem('od2-trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('od2-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const categories = [
    "Transportation",
    "Accommodation", 
    "Food & Dining",
    "Activities",
    "Shopping",
    "Other"
  ];

  const addTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      ...tripData,
      createdAt: new Date().toISOString(),
    };
    setTrips([...trips, newTrip]);
    setIsAddTripOpen(false);
  };

  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      tripId: selectedTrip?.id,
      ...expenseData,
      createdAt: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
    setIsAddExpenseOpen(false);
  };

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
  };

  const getTripExpenses = (tripId) => {
    return expenses.filter(exp => exp.tripId === tripId);
  };

  const getTripTotal = (tripId) => {
    return getTripExpenses(tripId).reduce((total, exp) => total + parseFloat(exp.amount || 0), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">OD2 Trip Expense Tracker</h1>
        <p className="text-lg text-muted-foreground">
          Track and manage your travel expenses with ease
        </p>
      </div>

      {/* Trip Selection */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Your Trips
          </CardTitle>
          <Dialog open={isAddTripOpen} onOpenChange={setIsAddTripOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trip</DialogTitle>
              </DialogHeader>
              <AddTripForm onSubmit={addTrip} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No trips yet. Add your first trip to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips.map((trip) => (
                <Card 
                  key={trip.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedTrip?.id === trip.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{trip.name}</h3>
                    <p className="text-sm text-muted-foreground">{trip.destination}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      {formatCurrency(getTripTotal(trip.id))}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Management */}
      {selectedTrip && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Expenses for {selectedTrip.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Total: {formatCurrency(getTripTotal(selectedTrip.id))}
              </p>
            </div>
            <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <AddExpenseForm onSubmit={addExpense} categories={categories} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ExpenseList 
              expenses={getTripExpenses(selectedTrip.id)} 
              onDelete={deleteExpense}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Add Trip Form Component
const AddTripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.destination && formData.startDate && formData.endDate) {
      onSubmit(formData);
      setFormData({ name: '', destination: '', startDate: '', endDate: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="tripName">Trip Name</Label>
        <Input
          id="tripName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Summer Vacation 2024"
          required
        />
      </div>
      <div>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="e.g., Paris, France"
          required
        />
      </div>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">Add Trip</Button>
    </form>
  );
};

// Add Expense Form Component
const AddExpenseForm = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.category) {
      onSubmit(formData);
      setFormData({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="e.g., Hotel accommodation"
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="expenseDate">Date</Label>
        <Input
          id="expenseDate"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">Add Expense</Button>
    </form>
  );
};

// Expense List Component
const ExpenseList = ({ expenses, onDelete, formatCurrency }) => {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No expenses yet. Add your first expense to get started!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h4 className="font-medium">{expense.description}</h4>
            <p className="text-sm text-muted-foreground">
              {expense.category} • {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">{formatCurrency(expense.amount)}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(expense.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTracker;