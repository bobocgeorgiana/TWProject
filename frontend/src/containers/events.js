import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, startTime, endTime, description) {
  id += 1;
  return { id, name, startTime, endTime, description };
}

const rows = [
  createData('Fotbal', '17/01/2018 12:00', '17/01/2018 13:00', 'Campionat de fotbal juniori'),
  createData('Concurs skandenberg', '17/01/2018 17:00', '17/01/2018 19:00', 'Invitat special Ion Oncescu'),
  createData('Baschet', '21/01/2018 11:00', '21/01/2018 14:00', 'Activitate organizata de liceul LTCCB'),
  createData('Handbal', '22/01/2018 10:00', '29/01/2018 13:00', 'Campionat regional'),
  createData('Fotbal', '31/01/2018 12:00', '31/01/2018 13:00', ''),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Starting date</TableCell>
            <TableCell align="right">Ending date</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);