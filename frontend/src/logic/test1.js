let input = [3, 9, 7, 3];

const result = getMinimumPartition(input);

function getMinimumPartition(nums) {
  const totalSum = nums.reduce((acc, num) => acc + num, 0);
  console.log(totalSum);
}
