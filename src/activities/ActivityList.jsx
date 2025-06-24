import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

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

/** Shows a list of activities, each links to details page */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <Link
            className="activity-list-link"
            to={`/activities/${activity.id}`}
          >
            {toTitleCase(activity.name)}
          </Link>
          <div
            style={{ color: "#374151", fontSize: "1rem", marginTop: "0.2rem" }}
          >
            {formatDescription(activity.description)}
          </div>
        </li>
      ))}
    </ul>
  );
}
