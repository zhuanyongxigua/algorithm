import { corpFlightBookings } from '.';


describe('corpFlightBookings', () => {
  test('Official test case 1: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5 should return [10,55,45,25,25]', () => {
    expect(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5)).toEqual([10,55,45,25,25]);
  });

  test('Official test case 2: bookings = [[1,2,10],[2,2,15]], n = 2 should return [10,25]', () => {
    expect(corpFlightBookings([[1,2,10],[2,2,15]], 2)).toEqual([10,25]);
  });
});
