import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositories, loadingSelector, repositoriesSelector } from "../features/repositories/repositorySlice";

export const RepositoryList: React.FC = (props) => {
  const dispatch = useDispatch()

  const loading = useSelector(loadingSelector)
  const repositories = useSelector(repositoriesSelector)

  React.useEffect(() => {
    dispatch(fetchRepositories())
  }, [dispatch]);

  return (
    <Table>
      <TableHead>
        <TableCell>Full Name</TableCell>
        <TableCell>Url</TableCell>
        <TableCell>Language</TableCell>
      </TableHead>
      <TableBody>
        {loading ? (
          <LinearProgress />
        ) : (
            repositories.map(repo => (
              <TableRow>
                <TableCell>{repo.full_name}</TableCell>
                <TableCell>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </TableCell>
                <TableCell>{repo.language}</TableCell>
              </TableRow>
            ))
          )}
      </TableBody>
    </Table>
  );
};
