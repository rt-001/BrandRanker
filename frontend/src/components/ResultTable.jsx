import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Tooltip,
} from "@mui/material";

/**
 * Displays the current ranking.
 * @param {{brand: string, [category: string]: number, avg: number}[]} data
 */
const ResultTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const categories = Object.keys(data[0]).filter(
    (key) => key !== "brand" && key !== "avg"
  );

  return (
    <Paper sx={{ mt: 4, overflowX: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Current Ranking
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Brand</strong></TableCell>
            {categories.map((cat) => (
              <TableCell key={cat}>
                <Tooltip title={cat}>
                  <span>{cat}</span>
                </Tooltip>
              </TableCell>
            ))}
            <TableCell><strong>Average</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={`${row.brand}-${idx}`}>
              <TableCell>{row.brand}</TableCell>
              {categories.map((cat) => (
                <TableCell key={cat}>{row[cat]}</TableCell>
              ))}
              <TableCell>
                {row.avg != null ? row.avg.toFixed(2) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ResultTable;
