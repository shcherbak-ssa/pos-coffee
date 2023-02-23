export async function sleep(time: number): Promise<void> {
  return await new Promise<void>((resolve) => setTimeout(() => resolve(), time));
}
