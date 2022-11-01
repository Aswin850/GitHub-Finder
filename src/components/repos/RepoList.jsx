import React from "react";
import PropType from "prop-types";

import RepoItems from "./RepoItems";

function RepoList({ repos }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Respositories
        </h2>
        {repos.map((repo, i) => {
          return (
            <>
              <RepoItems key={repo.id} repo={repo} />
            </>
          );
        })}
      </div>
    </div>
  );
}

RepoList.prototype = {
  repos: PropType.array.isRequired,
};

export default RepoList;
