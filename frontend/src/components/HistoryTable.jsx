import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const HistoryTable = ({ history }) => {
  if (!history.length) return null;

  return (
    <Paper sx={{ mt: 4, overflowX: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Past Experiments
      </Typography>

      {history.map((exp, idx) => {
        // Extract category names dynamically (excluding brand/avg/_id)
        const categories = exp.rankings?.length
          ? Object.keys(exp.rankings[0]).filter(
              (key) => !["brand", "avg", "_id"].includes(key)
            )
          : [];

        return (
          <Box key={exp._id || idx} sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Experiment Date: {new Date(exp.createdAt).toLocaleString()}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Brand</strong></TableCell>
                  {categories.map((cat) => (
                    <TableCell key={cat}><strong>{cat}</strong></TableCell>
                  ))}
                  <TableCell><strong>Avg Rank</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {exp.rankings.map((r, i) => (
                  <TableRow key={r.brand + i}>
                    <TableCell>{r.brand}</TableCell>
                    {categories.map((cat) => (
                      <TableCell key={cat}>{r[cat]}</TableCell>
                    ))}
                    <TableCell>{r.avg?.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {idx !== history.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
          </Box>
        );
      })}
    </Paper>
  );
};

export default HistoryTable;
