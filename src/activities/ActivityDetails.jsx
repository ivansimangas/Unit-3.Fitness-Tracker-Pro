import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

/** Format to Title Case */
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/** Capitalize first letter and ensure period */
function formatDescription(desc) {
  if (!desc) return "";
  const d = desc.trim();
  if (d.length === 0) return "";
  let first = d.charAt(0).toUpperCase() + d.slice(1);
  if (!/[.!?]$/.test(first)) first += ".";
  return first;
}

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`);

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  if (!activity) return <p>Activity not found.</p>;

  return (
    <div className="details-card">
      <h1>{toTitleCase(activity.name)}</h1>
      <p>{formatDescription(activity.description)}</p>
      <p style={{ color: "#6366f1", fontWeight: 700 }}>
        Created by: {activity.creatorName || "Unknown"}
      </p>
      {token && (
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
      {deleteError && <div className="error">{deleteError}</div>}
    </div>
  );
}
