export default function handler(req, res) {
  const { userName, password } = req.body;
  if (userName === "silva" && password === process.env.password) {
    console.log(userName, password);
    res.status(200).json({ token: process.env.token });
  } else {
    res.status(400).json({ res: "no admin" });
  }
}
