// Comprehensive dummy data for ONGO logistics platform

// Truck Types
export const truckTypes = [
  'Open (7.5-43T)',
  'Container',
  'LCV',
  'Mini/Pickup',
  'Trailer',
  'Tipper',
  'Tanker'
];

// Indian Cities
export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad'
];

// Products
export const products = [
  'Electronics', 'Textiles', 'FMCG', 'Machinery', 'Chemicals',
  'Food Grains', 'Steel', 'Cement', 'Furniture', 'Auto Parts'
];

// Generate 50 Trucks
export const trucks = Array.from({ length: 50 }, (_, i) => ({
  id: `TRK${String(i + 1).padStart(3, '0')}`,
  registrationNumber: `MH${String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 9999) + 1000)}`,
  type: truckTypes[Math.floor(Math.random() * truckTypes.length)],
  capacity: [7.5, 10, 15, 20, 25, 32, 43][Math.floor(Math.random() * 7)],
  status: ['Available', 'On Trip', 'Maintenance'][Math.floor(Math.random() * 3)],
  fastagBalance: Math.floor(Math.random() * 5000),
  fastagStatus: function () {
    if (this.fastagBalance === 0) return 'Blacklisted';
    if (this.fastagBalance < 300) return 'Low Balance';
    return 'Active';
  }
}));

// Generate 30 Drivers
export const drivers = Array.from({ length: 30 }, (_, i) => ({
  id: `DRV${String(i + 1).padStart(3, '0')}`,
  name: [
    'Rajesh Kumar', 'Suresh Patil', 'Ramesh Singh', 'Vijay Sharma', 'Anil Yadav',
    'Prakash Reddy', 'Mahesh Gupta', 'Dinesh Verma', 'Santosh Joshi', 'Ganesh Naik',
    'Ravi Kumar', 'Ashok Pandey', 'Manoj Tiwari', 'Sanjay Mishra', 'Deepak Chauhan',
    'Pankaj Rao', 'Nitin Desai', 'Rahul Mehta', 'Amit Patel', 'Sachin Thakur',
    'Vikas Nair', 'Ajay Kulkarni', 'Rakesh Iyer', 'Naveen Pillai', 'Kiran Shetty',
    'Mohan Das', 'Gopal Krishna', 'Hari Prasad', 'Shyam Sundar', 'Balaji Raman'
  ][i],
  phone: `+91 ${String(Math.floor(Math.random() * 9000000000) + 1000000000)}`,
  status: ['On Trip', 'Idle', 'Offline'][Math.floor(Math.random() * 3)],
  assignedTruck: Math.random() > 0.5 ? trucks[Math.floor(Math.random() * 50)].id : null,
  experience: Math.floor(Math.random() * 20) + 1,
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
  tripsCompleted: Math.floor(Math.random() * 500) + 10
}));

// Generate 100 Loads
export const loads = Array.from({ length: 100 }, (_, i) => {
  const fromCity = cities[Math.floor(Math.random() * cities.length)];
  let toCity = cities[Math.floor(Math.random() * cities.length)];
  while (toCity === fromCity) {
    toCity = cities[Math.floor(Math.random() * cities.length)];
  }

  const weight = Math.floor(Math.random() * 40) + 5;
  const distance = Math.floor(Math.random() * 2000) + 100;
  const baseRate = distance * (Math.random() * 15 + 10);
  const loadValue = Math.floor(baseRate * weight);

  return {
    id: `LD${String(i + 1).padStart(4, '0')}`,
    from: fromCity,
    to: toCity,
    truckType: truckTypes[Math.floor(Math.random() * truckTypes.length)],
    weight: weight,
    product: products[Math.floor(Math.random() * products.length)],
    loadValue: loadValue,
    commission: Math.floor(loadValue * 0.03),
    netPayout: Math.floor(loadValue * 0.97),
    paymentTerms: ['90% Advance', '100% Advance', '50% Advance', 'To Pay'][Math.floor(Math.random() * 4)],
    paymentGuaranteed: Math.random() > 0.3,
    distance: distance,
    status: ['Available', 'Assigned', 'In Transit', 'Completed'][Math.floor(Math.random() * 4)],
    assignedDriver: null,
    assignedTruck: null,
    postedDate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
  };
});

// FASTag Transactions
export const fastagTransactions = Array.from({ length: 200 }, (_, i) => ({
  id: `FT${String(i + 1).padStart(5, '0')}`,
  truckId: trucks[Math.floor(Math.random() * 50)].id,
  type: ['Recharge', 'Toll Deduction'][Math.floor(Math.random() * 2)],
  amount: Math.random() > 0.5 ? [500, 1000, 2000][Math.floor(Math.random() * 3)] : Math.floor(Math.random() * 200) + 20,
  platformFee: 29,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
  location: cities[Math.floor(Math.random() * cities.length)]
}));

// Fuel Tracking Data
export const fuelData = Array.from({ length: 50 }, (_, i) => {
  const tripDistance = Math.floor(Math.random() * 2000) + 100;
  const dieselIssued = Math.floor(Math.random() * 500) + 100;
  const expected = Math.floor(tripDistance / (Math.random() * 2 + 4)); // 4-6 km/l
  const variance = Math.random() > 0.8 ? Math.floor(Math.random() * 50) : 0; // 20% chance of leakage
  const dieselConsumed = expected + variance;

  return {
    id: `FUEL${String(i + 1).padStart(3, '0')}`,
    truckId: trucks[i].id,
    tripDistance: tripDistance,
    dieselIssued: dieselIssued,
    dieselConsumed: dieselConsumed,
    pricePerLitre: Math.floor(Math.random() * 10) + 90,
    fuelEfficiency: (tripDistance / dieselConsumed).toFixed(2),
    hasLeakage: dieselConsumed > dieselIssued * 1.1
  };
});

// Revenue Metrics
export const revenueMetrics = {
  activeTrucks: trucks.filter(t => t.status === 'On Trip').length,
  tripsCompleted: Math.floor(Math.random() * 500) + 200,
  fastagRecharges: fastagTransactions.filter(t => t.type === 'Recharge').length,
  monthlyRevenue: 0
};

// Calculate monthly revenue
revenueMetrics.monthlyRevenue =
  revenueMetrics.fastagRecharges * 29 +
  loads.filter(l => l.status === 'Completed').reduce((sum, l) => sum + l.commission, 0) +
  revenueMetrics.tripsCompleted * 101;

// Daily Revenue Data for Charts (Last 30 days)
export const dailyRevenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));

  const fastagRevenue = Math.floor(Math.random() * 5000) + 2000;
  const loadRevenue = Math.floor(Math.random() * 15000) + 5000;
  const tripRevenue = Math.floor(Math.random() * 8000) + 3000;

  return {
    date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    fastagRevenue: fastagRevenue,
    loadRevenue: loadRevenue,
    tripRevenue: tripRevenue,
    total: fastagRevenue + loadRevenue + tripRevenue
  };
});

// Revenue Streams Breakdown
export const revenueStreams = [
  {
    name: 'FASTag Recharges',
    value: revenueMetrics.fastagRecharges * 29,
    count: revenueMetrics.fastagRecharges,
    perUnit: 29,
    color: '#22c55e'
  },
  {
    name: 'Load Commissions',
    value: loads.filter(l => l.status === 'Completed').reduce((sum, l) => sum + l.commission, 0),
    count: loads.filter(l => l.status === 'Completed').length,
    perUnit: '3%',
    color: '#3b82f6'
  },
  {
    name: 'Driver Trip Fees',
    value: revenueMetrics.tripsCompleted * 101,
    count: revenueMetrics.tripsCompleted,
    perUnit: 101,
    color: '#f59e0b'
  }
];

// Export all data
export default {
  truckTypes,
  cities,
  products,
  trucks,
  drivers,
  loads,
  fastagTransactions,
  fuelData,
  revenueMetrics,
  dailyRevenueData,
  revenueStreams
};
